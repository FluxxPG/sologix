"use client";
import { API } from "@/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Spinner } from "@nextui-org/react";

const PaymentHistory = () => {
  const router = useRouter();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        setLoading(true);
        
        // Get authentication token
        const userSession = localStorage.getItem("userSession");
        const parsedSession = userSession ? JSON.parse(userSession) : null;
        const accessToken = parsedSession?.access_token;
        
        if (!accessToken) {
          router.push('/login');
          return;
        }

        // Make authenticated request - note: baseURL already includes /v1/
        const response = await API.get("/payments/get-user-payments", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        });
        
        if (response.status==200) {
          setPayments(response.data || []);
        } else {
          console.warn("Unexpected response format:", response.data);
          toast.warning(response.data?.message || "Received unexpected data format from server");
          setPayments([]);
        }
      } catch (error) {
        console.error("Error fetching payment history:", error);
        
        // Handle different error cases
        if (error.response) {
          // Server responded with a status code outside 2xx
          if (error.response.status === 401) {
            // Unauthorized - token expired or invalid
            localStorage.removeItem("userSession");
            router.push('/login');
            toast.error("Your session has expired. Please login again.");
          } else if (error.response.status === 500) {
            toast.error("Server error. Please try again later.");
          } else if (error.response.status === 404) {
            toast.info("No payment history found");
            setPayments([]);
          } else {
            toast.error(error.response.data?.message || `Error: ${error.response.status}`);
          }
        } else if (error.request) {
          // Request was made but no response received
          toast.error("Network error. Please check your connection and try again.");
        } else {
          // Something else happened
          toast.error(error.message || "An unexpected error occurred");
        }
        
        setPayments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, []);

  // Format date function
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "PPP");
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-[#00237D]">
          Payment History
        </h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <Spinner size="lg" color="primary" />
            <p className="text-gray-600">Loading your payment history...</p>
          </div>
        ) : payments.length > 0 ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#00237D] text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Payment ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Products
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payments.map((payment, index) => (
                    <tr key={payment._id || index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(payment.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.razorpay_payment_id || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.razorpay_order_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{payment.amount_paid.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <ul className="list-disc list-inside">
                          {payment.productNames.map((product, idx) => (
                            <li key={idx}>{product}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Payment History</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              You haven't made any payments yet. Your payment history will appear here once you complete a transaction.
            </p>
            <div className="mt-6">
              <button
                onClick={() => window.location.href = '/afterleadingpage'}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                View Products
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
