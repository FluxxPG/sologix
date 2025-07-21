"use client";
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { API } from "@/utils";
import { toast } from "sonner";
import { useSelector } from "react-redux";

// Add this error boundary component above your RazorpayCheckout component
const PaymentErrorBoundary = ({ children }) => {
  const [error, setError] = useState(null);

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-800 rounded-lg">
        <p>Payment processing failed. Please try again.</p>
        <button 
          onClick={() => setError(null)}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Retry Payment
        </button>
      </div>
    );
  }

  return (
    <ErrorBoundary 
      onError={(error) => {
        console.error("Payment error:", error);
        setError(error);
      }}
      FallbackComponent={ErrorFallback}
    >
      {children}
    </ErrorBoundary>
  );
};

const RazorpayCheckout = ({
  amount,
  productData,
  userId,
  onPaymentSuccess,
  onPaymentError,
  buttonText = "Pay Now",
  userDetails = {},
}) => {
  const [loading, setLoading] = useState(false);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const session = useSelector((state) => state.session);
  const accessToken = session?.userSession?.token || "";

  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        if (window.Razorpay) {
          setIsRazorpayLoaded(true);
          return resolve(true);
        }
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => {
          setIsRazorpayLoaded(true);
          resolve(true);
        };
        script.onerror = (error) => {
          console.error("Razorpay SDK failed to load:", error);
          toast.error("Failed to load payment gateway");
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript();
  }, []);

  const handlePayment = async () => {
    try {
      setLoading(true);
      console.log('Initiating payment process...');

      if (!window.Razorpay) {
        const errorMsg = "Payment gateway is not loaded yet. Please try again.";
        console.error(errorMsg);
        toast.error(errorMsg);
        setLoading(false);
        return;
      }

      // Validate amount
      if (!amount || isNaN(amount) || amount <= 0) {
        const errorMsg = 'Invalid payment amount';
        console.error(errorMsg, { amount });
        toast.error('Please enter a valid payment amount');
        setLoading(false);
        return;
      }

      console.log('Creating order with amount:', amount);
      
      // Create order through your backend
      let orderResponse;
      try {
        orderResponse = await API.post(
          "/payments/create-order",
          {
            amount: Math.ceil(amount) * 100, // Convert to paise for Razorpay
            currency: "INR",
            notes: {
              product: productData?.name || 'Solar Product',
              userId: userId || 'unknown'
            }
          },
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest'
            },
            timeout: 30000 // 30 seconds timeout
          }
        );
        
        console.log('Order creation response:', orderResponse.data);
      } catch (apiError) {
        console.error('Error creating order:', apiError);
        const errorMsg = apiError.response?.data?.message || 
                        apiError.message || 
                        'Failed to create payment order';
        toast.error(errorMsg);
        throw apiError;
      }

      if (!orderResponse?.data?.success || !orderResponse.data.orderId) {
        const errorMsg = orderResponse?.data?.message || "Could not create order";
        console.error('Order creation failed:', orderResponse?.data);
        toast.error(errorMsg);
        setLoading(false);
        return;
      }

      console.log('Initializing Razorpay with order ID:', orderResponse.data.orderId);
      
      const options = {
        key: "rzp_live_owEHmNbTDuJgjq",
        amount: orderResponse.data.amount,
        currency: "INR",
        name: "Sologix Energy",
        description: `Purchase: ${productData?.name || 'Solar Product'}`,
        image: "/logo.png", // Make sure this logo exists in your public folder
        order_id: orderResponse.data.orderId,
        handler: async function (response) {
          console.log('Razorpay payment success callback:', response);
          
          // Show loading state while verifying payment
          toast.loading('Verifying your payment...');
          
          try {
            console.log('Sending payment verification request...');
            const verificationResponse = await API.post(
              "/payments/verify-payment",
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                amount: amount, // Include the original amount for verification
                order_id: orderResponse.data.orderId // Include the original order ID
              },
              {
                headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': 'application/json',
                  'X-Requested-With': 'XMLHttpRequest'
                },
                timeout: 30000 // 30 seconds timeout
              }
            );

            console.log('Payment verification response:', verificationResponse.data);
            
            if (verificationResponse.data?.success) {
              toast.dismiss();
              toast.success("Payment successful! Processing your order...");
              
              if (onPaymentSuccess) {
                onPaymentSuccess({
                  ...verificationResponse.data,
                  paymentDetails: response,
                  orderDetails: orderResponse.data
                });
              }
            } else {
              const errorMsg = verificationResponse.data?.message || "Payment verification failed";
              console.error('Payment verification failed:', errorMsg);
              throw new Error(errorMsg);
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            const errorMsg = error.response?.data?.message || 
                           error.message || 
                           "We're having trouble verifying your payment. Please check your payment history or contact support.";
            
            toast.dismiss();
            toast.error(errorMsg);
            
            if (onPaymentError) {
              onPaymentError({
                ...error,
                paymentDetails: response,
                isVerificationError: true
              });
            }
          }
        },
        prefill: {
          name: userDetails.name || "",
          email: userDetails.email || "",
          contact: userDetails.phone || "",
        },
        theme: {
          color: "#00237D",
        },
      };

      console.log('Opening Razorpay checkout...');
      const rzp = new window.Razorpay(options);
      
      // Handle modal close event
      rzp.on('payment.failed', function (response) {
        console.error('Razorpay payment failed:', response.error);
        const errorMsg = response.error?.description || 'Payment was not completed';
        toast.error(`Payment failed: ${errorMsg}`);
        
        if (onPaymentError) {
          onPaymentError({
            ...response.error,
            isModalError: true,
            code: response.error?.code || 'PAYMENT_FAILED'
          });
        }
      });
      
      // Handle modal close without payment
      rzp.on('modal.close', function() {
        console.log('Payment modal was closed by the user');
        toast.info('Payment was not completed. You can try again.');
      });
      
      // Handle any Razorpay errors
      rzp.on('error', function(error) {
        console.error('Razorpay error:', error);
        toast.error('An error occurred with the payment gateway. Please try again.');
        
        if (onPaymentError) {
          onPaymentError({
            ...error,
            isRazorpayError: true,
            code: error.code || 'RAZORPAY_ERROR'
          });
        }
      });
      
      // Open the Razorpay checkout
      rzp.open();
      
      // Reset loading state after a short delay to ensure the modal is shown
      setTimeout(() => setLoading(false), 1000);
      
    } catch (error) {
      console.error("Payment initialization error:", error);
      const errorMsg = error.response?.data?.message || 
                      error.message || 
                      'Failed to initialize payment. Please try again.';
      
      toast.error(errorMsg);
      
      if (onPaymentError) {
        onPaymentError({
          ...error,
          isInitializationError: true,
          code: error.code || 'INITIALIZATION_ERROR'
        });
      }
      setLoading(false);
    }
  };

  // Determine button state and text
  const getButtonState = () => {
    if (loading) {
      return {
        text: 'Processing...',
        disabled: true,
        color: 'default',
        showSpinner: true
      };
    }
    
    if (!isRazorpayLoaded) {
      return {
        text: 'Loading Payment Gateway...',
        disabled: true,
        color: 'default',
        showSpinner: true
      };
    }
    
    if (!amount || amount <= 0) {
      return {
        text: 'Enter Amount',
        disabled: true,
        color: 'default',
        showSpinner: false
      };
    }
    
    return {
      text: buttonText,
      disabled: false,
      color: 'primary',
      showSpinner: false
    };
  };
  
  const buttonState = getButtonState();
  
  return (
    <div className="w-full">
      <Button
        className={`w-full ${buttonState.color === 'primary' ? 'bg-[#00237D]' : 'bg-gray-400'} text-white rounded-full mt-5`}
        size="lg"
        onPress={handlePayment}
        isLoading={buttonState.showSpinner}
        isDisabled={buttonState.disabled}
        spinnerPlacement="start"
        startContent={buttonState.showSpinner ? undefined : null}
      >
        {buttonState.text}
      </Button>
      
      {!isRazorpayLoaded && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          Loading payment gateway. Please wait...
        </p>
      )}
    </div>
  );
};

export default RazorpayCheckout;
