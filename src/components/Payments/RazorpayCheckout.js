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

      if (!window.Razorpay) {
        toast.error("Payment gateway is not loaded yet. Please try again.");
        setLoading(false);
        return;
      }

      // Create order through your backend
      const orderResponse = await API.post(
        "/payments/create-order",
        {
          amount: Math.ceil(amount) * 100,
          currency: "INR",
        },
        {
          headers: {
            authorization: `token ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!orderResponse.data.success || !orderResponse.data.orderId) {
        toast.error(orderResponse.data.message || "Could not create order");
        setLoading(false);
        return;
      }

      const options = {
        key: "rzp_live_owEHmNbTDuJgjq",
        amount: orderResponse.data.amount,
        currency: "INR",
        name: "Sologix",
        description: "Solar Product Purchase",
        image: "",
        order_id: orderResponse.data.orderId,
        handler: async function (response) {
          try {
            const verificationResponse = await API.post(
              "/payments/verify-payment",
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  authorization: `token ${accessToken}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (verificationResponse.data.success) {
              toast.success("Payment successful!");
              if (onPaymentSuccess) {
                onPaymentSuccess({
                  ...verificationResponse.data,
                  paymentDetails: response,
                });
              }
            } else {
              throw new Error(verificationResponse.data.message || "Payment verification failed");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error(error.message || "Payment verification failed");
            if (onPaymentError) onPaymentError(error);
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

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        toast.error(`Payment failed: ${response.error.description}`);
        if (onPaymentError) onPaymentError(response.error);
        setLoading(false);
      });

      rzp.open();
    } catch (error) {
      console.error("Payment initialization error:", error);
      toast.error("Failed to initialize payment. Please try again.");
      if (onPaymentError) onPaymentError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className="w-full bg-[#00237D] text-white rounded-full mt-5"
      size="lg"
      onPress={handlePayment}
      isLoading={loading}
      disabled={loading || !isRazorpayLoaded}
    >
      {loading
        ? "Processing..."
        : !isRazorpayLoaded
        ? "Loading Payment..."
        : buttonText}
    </Button>
  );
};

export default RazorpayCheckout;
