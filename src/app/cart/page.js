"use client";
import { API } from "@/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import RazorpayCheckout from "@/components/Payments/RazorpayCheckout";

const CartPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cartList, setCartList] = useState(null);

  const getCartListing = async () => {
    try {
      setLoading(true);
      const userSession = localStorage.getItem("userSession");
      const parsedSession = userSession ? JSON.parse(userSession) : null;
      const accessToken = parsedSession?.access_token;
      
      if (!accessToken) {
        router.push('/login');
        return;
      }

      const response = await API.get("/cart/Get-user-cart", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      });

      console.log("Raw API Response:", response);
      console.log("Response Data:", response.data);
      console.log("Response Status:", response.status);
      console.log("Response Headers:", response.headers);

      if (response.status === 200) {
        // Check different possible response structures
        let cartItems = [];
        
        if (Array.isArray(response.data)) {
          // Case 1: Response data is the array directly
          cartItems = response.data;
        } else if (response.data?.data?.cart) {
          // Case 2: Response is { data: { cart: [...] } }
          cartItems = Array.isArray(response.data.data.cart) ? response.data.data.cart : [];
        } else if (response.data?.cart) {
          // Case 3: Response is { cart: [...] }
          cartItems = Array.isArray(response.data.cart) ? response.data.cart : [];
        } else if (response.data?.data) {
          // Case 4: Response is { data: [...] }
          cartItems = Array.isArray(response.data.data) ? response.data.data : [];
        }
        
        console.log("Extracted Cart Items:", cartItems);
        setCartList(cartItems);
        
        if (cartItems.length === 0) {
          console.warn("No items found in cart");
          toast.info("Your cart is empty");
        }
      } else {
        console.error("API Error:", {
          status: response.status,
          statusText: response.statusText,
          data: response.data
        });
        toast.error(response.data?.message || "Failed to fetch cart items. Please try again.");
        setCartList([]);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      
      if (error.response?.status === 401) {
        // Token expired or invalid, redirect to login
        localStorage.removeItem("userSession");
        router.push('/login');
        toast.error("Your session has expired. Please login again.");
      } else {
        toast.error(error.response?.data?.message || "An error occurred while fetching your cart.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCartListing();
  }, []);

  const removeItem = async (productId, e) => {
    if (e) {
      e.stopPropagation(); // Prevent event bubbling to parent elements
      e.preventDefault();  // Prevent any default behavior
    }
    
    try {
      setLoading(true);
      const userSession = localStorage.getItem("userSession");
      const parsedSession = userSession ? JSON.parse(userSession) : null;
      const accessToken = parsedSession?.access_token;
      
      if (!accessToken) {
        console.error('No access token found');
        router.push('/login');
        return;
      }

      console.log('Attempting to remove product:', productId);
      console.log('Current cart before removal:', cartList);

      // Optimistically update the UI first
      setCartList(prevCart => {
        const updatedCart = prevCart?.filter(item => item._id !== productId) || [];
        console.log('Optimistic UI update - new cart:', updatedCart);
        return updatedCart;
      });

      try {
        // Then make the API call
        console.log('Making API call to remove item...');
        const response = await API.delete(
          `/cart/Remove-from-cart?productId=${productId}`,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            timeout: 10000 // 10 seconds
          }
        );

        console.log('API Response:', response);

        // Verify the response
        if (response.status !== 200) {
          throw new Error(response?.data?.error || `Server returned status ${response.status}`);
        }

        console.log('Item successfully removed from server');
      } catch (apiError) {
        console.error('Error in API call:', {
          message: apiError.message,
          response: apiError.response?.data,
          status: apiError.response?.status,
          config: {
            url: apiError.config?.url,
            method: apiError.config?.method,
            headers: apiError.config?.headers
          }
        });
        throw apiError;
      }

      // If we get here, the server confirmed the removal
      toast.success("Item removed from cart successfully.");
      
      try {
        console.log('Refreshing cart to ensure sync with server...');
        // Force a hard refresh of the cart from the server
        const refreshResponse = await API.get("/cart/Get-user-cart", {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });

        console.log('Cart refresh response:', refreshResponse.data);

        if (refreshResponse.status === 200) {
          // Handle different possible response formats
          const serverCart = refreshResponse.data?.cart || refreshResponse.data?.data?.cart || [];
          const cartItems = Array.isArray(serverCart) ? serverCart : [];
          
          console.log('Refreshed cart items from server:', cartItems);
          setCartList(cartItems);
          
          // If cart is empty after refresh, redirect
          if (cartItems.length === 0) {
            console.log('Cart is now empty, redirecting...');
            toast.info("Your cart is now empty.");
            router.replace("/afterleadingpage");
          } else {
            // Verify the item was actually removed
            const itemStillExists = cartItems.some(item => item._id === productId);
            if (itemStillExists) {
              console.error('Item still exists in cart after removal:', productId);
              toast.error("Failed to remove item. Please try again.");
              // Force a full page reload as a last resort
              window.location.reload();
            }
          }
        } else {
          console.error('Failed to refresh cart:', refreshResponse.status, refreshResponse.data);
          // If we can't refresh, at least show a message
          toast.warning("Item removed, but we couldn't verify the cart status.");
        }
      } catch (refreshError) {
        console.error('Error refreshing cart:', refreshError);
        toast.warning("Item removed, but we couldn't verify the cart status.");
      }
    } catch (error) {
      toast.error("An error occurred while removing the product.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    router.push(`/product-details/${item._id}`);
  };

  const totalCost = cartList?.reduce(
    (acc, item) => acc + item.product_details.Cost_to_consumer,
    0
  ) || 0;

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const handlePaymentSuccess = async (paymentData) => {
    const bookingFee = 2000; // Fixed booking fee in INR
    console.log("Payment successful:", paymentData);
    
    try {
      // Get access token from localStorage
      const userSession = localStorage.getItem("userSession");
      const parsedSession = userSession ? JSON.parse(userSession) : null;
      const accessToken = parsedSession?.access_token;
      
      if (!accessToken) {
        throw new Error("User not authenticated. Please log in again.");
      }
      
      if (!cartList?.length) {
        throw new Error("No items in cart to process payment");
      }
      
      // Get product details for the payment record
      const productNames = cartList.map(item => item.system || 'Solar System');
      const productIds = cartList.map(item => item._id);
      
      // Prepare payment data
      const paymentRecord = {
        razorpay_order_id: paymentData.razorpay_order_id,
        razorpay_payment_id: paymentData.razorpay_payment_id,
        razorpay_signature: paymentData.razorpay_signature,
        amount_paid: bookingFee, // Use the fixed booking fee
        currency: 'INR',
        status: 'completed',
        productNames: productNames,
        productIds: productIds,
        cartItems: [...cartList], // Take a copy of the cart items
        payment_timestamp: new Date().toISOString()
      };
      
      console.log('Sending payment to server:', paymentRecord);
      
      // Store payment record
      const response = await API.post(
        "/payments/store-payments",
        paymentRecord,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          timeout: 15000 // 15 seconds timeout
        }
      );
      
      console.log('Payment storage response:', response.data);
      
      if (response.status === 200) {
        // Clear the cart after successful payment
        try {
          await clearCart(accessToken);
          // Update local state
          setCartList([]);
          setPaymentSuccess(true);
          toast.success("Payment successful! Your order has been placed.");
          
          // Redirect to payment success page with order details
          const successUrl = `/payment/success?payment_id=${paymentData.razorpay_payment_id}&amount=2000&total=${totalCost}&remaining=${totalCost - 2000}`;
          router.push(successUrl);
          
        } catch (clearError) {
          console.error("Error clearing cart:", clearError);
          // Don't fail the payment if cart clearing fails
          toast.success("Payment successful! Your order is being processed.");
          router.push(`/payment/success?payment_id=${paymentData.razorpay_payment_id}`);
        }
      } else {
        throw new Error(response.data?.message || "Failed to process payment");
      }
      
    } catch (error) {
      console.error("Payment processing error:", error);
      toast.error(error.response?.data?.message || 
                error.message || 
                "An error occurred during payment processing. Please check your payment history.");
      
      // Log the error for debugging
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error status:', error.response.status);
      }
      
    } finally {
      setPaymentLoading(false);
    }
  };

  const handlePaymentError = (error) => {
    console.error('Razorpay payment error:', error);
    
    let errorMessage = "Payment failed. ";
    
    // Map common Razorpay error codes to user-friendly messages
    if (error.error) {
      switch(error.error.code) {
        case 'PAYMENT_CANCELLED':
          errorMessage += "You cancelled the payment.";
          break;
        case 'NETWORK_ERROR':
          errorMessage += "Network error occurred. Please check your internet connection.";
          break;
        case 'INVALID_PAYMENT_METHOD':
          errorMessage += "The selected payment method is not available. Please try another method.";
          break;
        case 'PAYMENT_DECLINED':
          errorMessage += "Your payment was declined by the bank. Please try another payment method.";
          break;
        default:
          errorMessage += error.error.description || "Please try again or contact support.";
      }
    } else {
      errorMessage += error.message || "An unknown error occurred.";
    }
    
    toast.error(errorMessage);
    setPaymentLoading(false);
  };
  
  // Function to fetch payment history
  const fetchPaymentHistory = async () => {
    try {
      const userSession = localStorage.getItem("userSession");
      const parsedSession = userSession ? JSON.parse(userSession) : null;
      const accessToken = parsedSession?.access_token;
      
      if (!accessToken) {
        console.error('No access token for fetching payment history');
        return [];
      }
      
      const response = await API.get("/payments/history", {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });
      
      if (response.status === 200) {
        return response.data.payments || [];
      } else {
        console.error('Failed to fetch payment history:', response.data);
        return [];
      }
    } catch (error) {
      console.error('Error fetching payment history:', error);
      return [];
    }
  };

  const clearCart = async (token) => {
    try {
      await API.delete("/cart/clear-cart", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
    } catch (error) {
      console.error("Error clearing cart:", error);
      // Don't show error to user as the payment was successful
    }
  };

  const forceClearCart = async () => {
    try {
      const userSession = localStorage.getItem("userSession");
      const parsedSession = userSession ? JSON.parse(userSession) : null;
      const accessToken = parsedSession?.access_token;
      
      if (!accessToken) {
        console.error('No access token for force clear');
        return;
      }
      
      console.log('Attempting to force clear cart...');
      const response = await API.delete('/cart/clear-cart', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Force clear response:', response.data);
      
      if (response.status === 200) {
        console.log('Cart force cleared successfully');
        setCartList([]);
        localStorage.removeItem('cart'); // Clear any cached cart data
        router.replace('/afterleadingpage');
      } else {
        console.error('Failed to force clear cart:', response.data);
      }
    } catch (error) {
      console.error('Error in forceClearCart:', error);
    }
  };

  const handleBooking = () => {
    setPaymentLoading(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6">
        Your Cart
      </h1>
      <div className="max-w-2xl mx-auto bg-white p-4 md:p-6 rounded-lg shadow-lg">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : cartList?.length > 0 ? (
          cartList.map((item) => (
            <div
              key={item._id}
              className="relative flex flex-col md:flex-row border-b py-4 md:py-6 px-3 md:px-4 rounded-lg hover:bg-gray-100"
              onClick={() => handleAddToCart(item)}
            >
              {/* Delete Button in Top-Right */}
              <button
                onClick={(e) => removeItem(item._id, e)}
                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 text-sm md:text-base rounded-md hover:bg-red-700 transition-colors"
                disabled={loading}
                aria-label="Remove item from cart"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  '×'
                )}
              </button>

              {/* Product Image */}
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg mb-2 md:mb-0 md:mr-6 flex-shrink-0">
                <Image
                  src={
                    item.system == "On-Grid Solar System"
                      ? "/product-one.png"
                      : "/product-three.png"
                  }
                  alt={item.system}
                  fill
                  className="object-contain rounded-lg"
                  sizes="(max-width: 80px) 80px, 80px"
                />
              </div>

              <div className="flex-1 text-left">
                <h2 className="text-base md:text-lg font-semibold">
                  {item.system}
                </h2>
                <p className="text-sm text-gray-500">
                  {item.product_description}
                </p>
                <p className="text-gray-600 text-sm md:text-base">
                  Roof Area: {item.product_details.Roof_area_required} sqm
                </p>
                <p className="text-gray-600 text-sm md:text-base">
                  Annual Generation:{" "}
                  {item.product_details.Annual_energy_generation} kWh
                </p>
                <p className="text-green-600 font-bold text-base md:text-lg">
                  Cost: ₹{item.product_details.Cost_to_consumer}
                </p>
                <p className="text-blue-600 text-sm md:text-base">
                  Annual Savings: ₹{item.product_details.Annual_saving}
                </p>
                <p className="text-gray-600 text-sm md:text-base">
                  System Life: {item.product_details.System_life} years
                </p>
                <p className="text-gray-600 text-sm md:text-base">
                  Payback Period: {item.product_details.Payback_period} years
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-6">
            <Image
              src="/shopping.png"
              alt="Empty Cart"
              width={100}
              height={100}
              className="mb-4"
              priority={false}
            />
            <p className="text-xl md:text-2xl font-bold text-gray-600 text-center">
              Your Cart is Empty
            </p>
          </div>
        )}
        {cartList?.length > 0 && (
          <div className="mt-6 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Product Value:</span>
              <span className="text-lg font-semibold">₹{totalCost.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Initial Payment (Booking Fee):</span>
              <span className="text-lg font-semibold text-blue-600">₹2,000</span>
            </div>
            <div className="border-t border-gray-200 my-2"></div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Remaining Amount:</span>
              <span className="text-lg font-semibold">₹{(totalCost - 2000).toLocaleString('en-IN')}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Pay ₹2,000 now as booking fee. The remaining amount can be paid in installments as per our flexible payment plans.
            </p>
          </div>
        )}

        {cartList?.length > 0 && !paymentSuccess && (
          <div className="mt-6">
            <RazorpayCheckout
              amount={2000} // 2000 INR as booking fee
              currency="INR"
              receipt={`order_${Date.now()}`}
              key="rzp_live_SkcgnoWr8UUe2U" // Replace with your actual Razorpay key
              name="Solar Solutions"
              description={`Booking fee for ${cartList?.length || 0} item(s)`}
              image="/logo.png"
              prefill={(() => {
                const userSession = localStorage.getItem("userSession");
                const parsedSession = userSession ? JSON.parse(userSession) : null;
                return {
                  name: `${parsedSession?.firstName || ''} ${parsedSession?.lastName || ''}`.trim(),
                  email: parsedSession?.email || '',
                  contact: parsedSession?.phone || ''
                };
              })()}
              notes={{
                address: "Solar Solutions Office"
              }}
              theme={{
                color: "#00237D"
              }}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
              onClose={() => {
                console.log('Payment modal closed');
                setPaymentLoading(false);
              }}
              modal={{
                ondismiss: () => {
                  console.log('Payment modal dismissed');
                  setPaymentLoading(false);
                }
              }}
              disabled={paymentLoading}
            >
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600">Initial Booking Fee</p>
                  <p className="text-3xl font-bold text-[#00237D] mb-1">₹2,000</p>
                  <p className="text-sm text-gray-600">
                    <span className="line-through">₹{totalCost.toLocaleString('en-IN')}</span>
                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Save ₹{(totalCost - 2000).toLocaleString('en-IN')}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Balance of ₹{(totalCost - 2000).toLocaleString('en-IN')} can be paid in easy installments
                  </p>
                </div>
                <button 
                  className={`w-full bg-[#00237D] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#001F6B] transition ${paymentLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={paymentLoading}
                >
                  {paymentLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Pay ₹2,000 Now & Book Your System'
                  )}
                </button>
              </div>
            </RazorpayCheckout>
            
            <p className="text-xs text-gray-500 mt-2 text-center">
              Secure payment powered by Razorpay
            </p>
            
            {/* Debug Button - Can be removed after fixing the issue */}
            <div className="mt-4 border-t pt-4">
              <p className="text-xs text-gray-500 mb-2">Having issues with your cart?</p>
              <button 
                onClick={forceClearCart}
                className="w-full bg-gray-200 text-gray-800 text-sm py-2 px-4 rounded hover:bg-gray-300 transition-colors"
              >
                Clear My Cart (Debug)
              </button>
              <p className="text-xs text-gray-400 mt-1">This will remove all items from your cart</p>
            </div>
          </div>
        )}
        
        {paymentSuccess && (
          <div className="mt-4 p-4 bg-green-100 rounded-lg text-center">
            <p className="text-green-700 font-medium">Booking confirmed! We'll contact you shortly.</p>
            <button
              onClick={() => router.push('/afterleadingpage')}
              className="mt-2 bg-[#00237D] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#001F6B] transition"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
