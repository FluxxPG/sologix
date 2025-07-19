"use client";
import { useState, useEffect } from 'react';
import { Button } from "@nextui-org/react";
import { API } from '@/utils';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const RazorpayCheckout = ({ 
  amount, 
  productData, 
  userId, 
  onPaymentSuccess, 
  onPaymentError,
  buttonText = "Pay Now",
  userDetails = {}
}) => {
  const [loading, setLoading] = useState(false);
  const session = useSelector((state) => state.session);
  const accessToken = session?.userSession?.token || '';

  // Load Razorpay script
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        if (window.Razorpay) {
          console.log('Razorpay already loaded');
          setIsRazorpayLoaded(true);
          return resolve(true);
        }
        console.log('Loading Razorpay script...');
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => {
          console.log('Razorpay script loaded successfully');
          setIsRazorpayLoaded(true);
          resolve(true);
        };
        script.onerror = (error) => {
          console.error('Razorpay SDK failed to load:', error);
          toast.error('Failed to load payment gateway');
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
      
      // Check if Razorpay is loaded
      if (!window.Razorpay) {
        toast.error("Payment gateway is not loaded yet. Please try again.");
        setLoading(false);
        return;
      }
      
      const userSession = localStorage.getItem("userSession");
      const parsedSession = userSession ? JSON.parse(userSession) : null;
      const accessToken = parsedSession?.access_token;
      // Create order
      console.log('Creating order with amount:', Math.ceil(amount) * 100);
      const orderResponse = await API.post("/payments/create-order", {
        amount: Math.ceil(amount) * 100, // Convert to paise
        currency: "INR",
        // Add test mode flag to inform backend this is a test payment
        test_mode: true
      }, {
        headers: {
          "authorization": `token ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      
      console.log('Order response:', orderResponse.data);

      if (!orderResponse.data.success) {
        console.error('Order creation failed:', orderResponse.data);
        toast.error("Could not create order. Please try again.");
        setLoading(false);
        return;
      }
      
      if (!orderResponse.data.orderId) {
        console.error('No order ID in response:', orderResponse.data);
        toast.error("Invalid order response. Please try again.");
        setLoading(false);
        return;
      }

      // Configure Razorpay options
      const options = {
        key: "rzp_live_SkcgnoWr8UUe2U", // Razorpay Key ID
        amount: Math.ceil(amount) * 100,
        currency: "INR",
        name: "Sologix",
        description: "Solar Product Purchase",
        image: "", // Your logo URL
        order_id: orderResponse.data.orderId,
        readonly: {
          email: false,
          contact: false
        },
        send_sms_hash: true,
        remember_customer: false,
        handler: async function (response) {
          try {
            console.log('Payment response:', response);
            
            // Verify payment
            const verificationResponse = await API.post(
              "/payments/verify-payment",
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                test_mode: true, // Add test mode flag for backend verification
                key_id: "rzp_test_DG0WOtGWfdYuXL" // Send the key_id to help backend use the right secret
              },
              {
                headers: {
                  "authorization": `token ${accessToken}`,
                  "Content-Type": "application/json",
                },
              }
            );
            
            console.log('Verification response:', verificationResponse.data);

            if (verificationResponse.data.success) {
              // Payment successful
              toast.success("Payment successful!");
              
              // Create purchase record
              const purchaseData = {
                user: userId,
                productData: productData,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                amount: amount
              };
              
              // You can add additional API call here to save the purchase
              // const purchaseResponse = await axios.post("https://sologix-web.onrender.com/v1/user/purchase", purchaseData);
              
              if (onPaymentSuccess) {
                onPaymentSuccess({
                  ...verificationResponse.data,
                  paymentDetails: response
                });
              }
            } else {
              throw new Error(verificationResponse.data.message || 'Payment verification failed');
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error(error.message || "Payment verification failed. Please contact support.");
            if (onPaymentError) {
              onPaymentError(error);
            }
          }
        },
        prefill: {
          name: userDetails.name || "",
          email: userDetails.email || "",
          contact: userDetails.phone || "",
        },
        notes: {
          productId: productData.id || "",
          userId: userId || ""
        },
        theme: {
          color: "#00237D",
        },
      };

      try {
        console.log('Creating Razorpay instance with options:', options);
        const rzp = new window.Razorpay(options);
        
        // Handle payment failures
        rzp.on('payment.failed', function (response) {
          console.log('Payment failed:', response.error);
          toast.error(`Payment failed: ${response.error.description}`);
          if (onPaymentError) {
            onPaymentError(response.error);
          }
          setLoading(false);
        });
        
        // Handle payment cancellation
        rzp.on('payment.cancel', function() {
          console.log('Payment cancelled by user');
          toast.info("Payment cancelled by user");
          if (onPaymentError) {
            onPaymentError({ description: "Payment cancelled by user" });
          }
          setLoading(false);
        });
        
        // Handle any other events
        rzp.on('payment.error', function(error) {
          console.error('Payment error:', error);
          toast.error('Payment error occurred');
          if (onPaymentError) {
            onPaymentError(error);
          }
          setLoading(false);
        });
        
        rzp.open();
      } catch (rzpError) {
        console.error("Razorpay initialization error:", rzpError);
        toast.error("Failed to initialize payment gateway. Please try again.");
        if (onPaymentError) {
          onPaymentError(rzpError);
        }
      }
    } catch (error) {
      console.error("Payment initialization error:", error);
      toast.error("Failed to initialize payment. Please try again.");
      if (onPaymentError) {
        onPaymentError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className="w-full bg-[#00237D] text-white rounded-full mt-5"
      size="lg"
      onClick={handlePayment}
      isLoading={loading}
      disabled={loading || !isRazorpayLoaded}
    >
      {loading ? "Processing..." : !isRazorpayLoaded ? "Loading Payment..." : buttonText}
    </Button>
  );
};

export default RazorpayCheckout;
