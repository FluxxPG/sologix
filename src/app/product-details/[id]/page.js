"use client"
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import SuccessModal from "@/components/Modals/SuccessModal";
import { API } from "@/utils";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { message } from "antd";
import FailureModal from "@/components/Modals/FailureModal";
import Invoice from "@/components/Invoice/Invoice";
import RazorpayCheckout from "@/components/Payments/RazorpayCheckout";
import ProductImageGallery from "@/components/common/ProductImageGallery";

const ProductDetails = () => {
    const { id } = useParams();
    const router = useRouter();
    const session = useSelector((state) => state.session);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

    const [showInvoice, setShowInvoice] = useState(false);
    const [purchaseCompleted, setPurchaseCompleted] = useState(false);


    const [loading, setLoading] = useState(false);
    const [getProduct, setGetProduct] = useState(null);

    const getSingleProduct = async () => {
        if (!id) return;
        try {
            setLoading(true);
            const response = await API.get(`/products/Get-single-product?id=${id}`);

            if (response.status === 200) {
                setGetProduct(response.data.data);
            } else {
                console.error("Error fetching products:", response);
                toast.error(response?.data?.error || "Failed to fetch products.");
                return [];
            }
        } catch (error) {
            console.error("API Error:", error);
            toast.error("An error occurred while fetching products.");
            return [];
        } finally {
            setLoading(false);
        }
    };
    const cost = getProduct?.product_details?.Cost_to_consumer;
    const tax = cost * 0.18;
    const total = cost + tax;
    useEffect(() => {
        if (id) getSingleProduct();
    }, [id]);


    const labels = {
        Roof_area_required: "Roof Area Required",
        Annual_energy_generation: "Annual Energy Generation",
        // Cost_to_consumer: "Cost to Consumer",
        Annual_saving: "Annual Saving",
        System_life: "System Life",
        Payback_period: "Payback Period",
    };
    const units = {
        Roof_area_required: "m²",
        Annual_energy_generation: "kWh",
        Annual_saving: "₹",
        System_life: "yrs",
        Payback_period: "yrs",
    };

    const handelPurchase = async (card) => {
        // Check if user is logged in
        if (!session.userSession) {
            // Redirect to login if not logged in
            router.push('/login');
            // Store the product ID to redirect back after login
            sessionStorage.setItem("redirectProductId", id);
            return;
        }
        
        // Legacy purchase method - keeping for reference
        const useRazorpay = true; // Set to true to use Razorpay, false to use legacy method
        
        if (!useRazorpay) {
            const perInstallments = Math.ceil(card.totalAmount / 4);
            const response = await API.post("/user/purchase", {
                user: session.userSession.id,
                productData: card,
                instamentOne: {
                    amount: perInstallments,
                    status: "pending",
                },
                instamentTwo: {
                    amount: perInstallments,
                    status: "pending",
                },
                instamentThree: {
                    amount: perInstallments,
                    status: "pending",
                },
                instamentFour: {
                    amount: perInstallments,
                    status: "pending",
                },
                instamentFive: {
                    amount: perInstallments,
                    status: "pending",
                },
            });
            if (response.status == 200) {
                setIsModalOpen(true);
                setPurchaseCompleted(true);
            } else {
                setIsErrorModalOpen(true);
                message.error(response?.data?.error);
            }
        } else {
            // Razorpay payment will be handled by the RazorpayCheckout component
            // The actual purchase logic will be executed after successful payment
        }
    };
    
    const handlePaymentSuccess = async (paymentData) => {
        try {
            // Extract payment details from the paymentData
            const { paymentDetails } = paymentData;
            
            // Call the store-payments API endpoint
            const response = await API.post("/payments/store-payments", {
                razorpay_order_id: paymentDetails.razorpay_order_id,
                razorpay_payment_id: paymentDetails.razorpay_payment_id,
                amount_paid: 2000, // Fixed booking amount
                total_amount: total, // Store the full amount for reference
                productNames: [getProduct.name],
                payment_type: "booking_payment",
                remaining_amount: total - 2000
            }, {
                headers: {
                    'Authorization': `Bearer ${session.userSession?.token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.status === 200) {
                toast.success("Booking amount of ₹2,000 paid successfully! Remaining amount payable later.");
            } else {
                console.error("Error storing payment details:", response);
                toast.error("Payment successful but failed to store details.");
            }
        } catch (error) {
            console.error("API Error when storing payment:", error);
            toast.error("Payment successful but failed to store details.");
        } finally {
            // Update UI state regardless of API call result
            setIsModalOpen(true);
            setPurchaseCompleted(true);
        }
    };
    
    const handlePaymentError = (error) => {
        setIsErrorModalOpen(true);
        message.error(error?.message || "Payment failed");
    };





    if (loading)
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00237D] mx-auto mb-4"></div>
                    <p className="text-lg font-medium text-gray-600">Loading product details...</p>
                </div>
            </div>
        );

    if (!getProduct)
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
                    <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
                    <Button
                        className="bg-[#00237D] text-white rounded-xl px-6 py-3"
                        onPress={() => router.push('/afterleadingpage')}
                    >
                        Browse Products
                    </Button>
                </div>
            </div>
        );


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
                {/* Breadcrumb Navigation */}
                <nav className="mb-8">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <button 
                            onClick={() => router.push('/afterleadingpage')}
                            className="hover:text-[#00237D] transition-colors duration-200"
                        >
                            Products
                        </button>
                        <span>/</span>
                        <span className="text-[#00237D] font-medium">{getProduct.system}</span>
                    </div>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Product Image Gallery */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        <ProductImageGallery
                            productType={getProduct.system || getProduct.name}
                            productName={getProduct.name || getProduct.system}
                            className="w-full"
                            showGallery={true}
                            imageHeight="h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[550px]"
                        />
                </div>

                {/* Product Details */}
                    <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-100">
                        <div className="mb-6">
                            <h1 className="text-3xl lg:text-4xl font-bold text-[#00237D] mb-4 leading-tight">
                        {getProduct.system}
                    </h1>
                            <p className="text-gray-600 text-lg leading-relaxed">
                        {getProduct.product_description}
                    </p>
                        </div>

                        {/* Product Specifications */}
                        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl overflow-hidden mb-8 border border-gray-200">
                            <div className="bg-[#00237D] text-white px-6 py-4">
                                <h3 className="text-xl font-bold">Product Specifications</h3>
                            </div>
                        {Object.entries(labels).map(([key, label], index) => (
                                <div key={key} className={`flex hover:bg-gray-100 transition-colors duration-200 ${index !== Object.keys(labels).length - 1 ? "border-b border-gray-200" : ""}`}>
                                    <div className="flex-1 p-4 bg-white border-r border-gray-200 text-gray-700 font-medium">
                                        {label}
                                    </div>
                                    <div className="flex-1 p-4 text-right font-bold text-gray-900">
                                    {getProduct.product_details[key] + (units[key] ? " " + units[key] : "")}
                                </div>
                            </div>
                        ))}
                    </div>

                        {/* Pricing Section */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-8 border border-green-200">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Plan</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-600 font-medium">Product Cost:</span>
                                    <span className="text-lg font-semibold text-gray-900">₹{cost?.toFixed(2) || '0.00'}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-t border-green-200">
                                    <span className="text-gray-600 font-medium">Tax (18%):</span>
                                    <span className="text-lg font-semibold text-gray-900">₹{tax?.toFixed(2) || '0.00'}</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-t-2 border-green-300 bg-white rounded-lg px-4">
                                    <span className="text-xl font-bold text-gray-800">Total Amount:</span>
                                    <span className="text-2xl font-bold text-green-600">₹{total?.toFixed(2) || '0.00'}</span>
                                </div>
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg px-4 py-3 border-2 border-blue-200">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-blue-800">Booking Amount:</span>
                                        <span className="text-2xl font-bold text-blue-600">₹2,000</span>
                                    </div>
                                    <div className="text-sm text-blue-600 mt-1">
                                        Remaining: ₹{(total - 2000)?.toFixed(2) || '0.00'} (Payable Later)
                                    </div>
                                    <div className="text-xs text-gray-500 mt-2 bg-white/50 rounded px-2 py-1">
                                        💡 Pay only ₹2,000 booking amount now to secure your order. Remaining amount can be paid later as per your convenience.
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-4">
                    {session.userSession ? (
                                <div className="space-y-4">
                        <RazorpayCheckout
                            amount={2000}
                            productData={getProduct}
                            userId={session.userSession?.id}
                            onPaymentSuccess={handlePaymentSuccess}
                            onPaymentError={handlePaymentError}
                            buttonText={`Pay ₹2,000 Booking Amount`}
                            userDetails={{
                                name: `${session.userSession?.firstName || ''} ${session.userSession?.lastName || ''}`,
                                email: session.userSession?.email || '',
                                phone: session.userSession?.phone || ''
                            }}
                        />
                                    
                                    {/* Additional Actions */}
                                    <div className="flex gap-3">
                                        <Button
                                            className="flex-1 bg-white text-[#00237D] border-2 border-[#00237D] rounded-xl font-semibold py-3 hover:bg-[#00237D] hover:text-white transition-all duration-300"
                                            onPress={() => {
                                                // Add to cart functionality
                                                toast.success("Added to cart!");
                                            }}
                                        >
                                            Add to Cart
                                        </Button>
                                        <Button
                                            className="flex-1 bg-gray-100 text-gray-700 border border-gray-300 rounded-xl font-semibold py-3 hover:bg-gray-200 transition-all duration-300"
                                            onPress={() => {
                                                // Wishlist functionality
                                                toast.success("Added to wishlist!");
                                            }}
                                        >
                                            Save for Later
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center space-y-4">
                        <Button
                                        className="w-full bg-gradient-to-r from-[#00237D] to-blue-700 text-white rounded-xl font-semibold py-4 text-lg hover:from-[#001a5e] hover:to-blue-800 transition-all duration-300 shadow-lg"
                                        onPress={() => {
                                sessionStorage.setItem("redirectProductId", id);
                                router.push('/login');
                            }}
                        >
                            Login to Proceed
                        </Button>
                                    <p className="text-sm text-gray-500">
                                        Sign in to purchase this product and access exclusive features
                                    </p>
                                </div>
                    )}

                    {purchaseCompleted && !isModalOpen && !showInvoice && (
                        <div className="mt-6 text-center">
                            <Button
                                        className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold py-3 px-8 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg"
                                        onPress={() => setShowInvoice(true)}
                            >
                                        View Invoice
                            </Button>
                        </div>
                    )}

                    {showInvoice && <Invoice crossPress={() => setShowInvoice(false)} price={getProduct.product_details.Cost_to_consumer} />}
                        </div>
                    </div>
                </div>

                {/* Product Features Section */}
                <div className="mt-12 bg-white rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-100">
                    <h2 className="text-2xl font-bold text-[#00237D] mb-6 text-center">Why Choose This Solar System?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                            <div className="w-16 h-16 bg-[#00237D] rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">High Efficiency</h3>
                            <p className="text-gray-600 text-sm">Maximum energy generation with advanced solar technology</p>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Cost Savings</h3>
                            <p className="text-gray-600 text-sm">Significant reduction in electricity bills over time</p>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Warranty</h3>
                            <p className="text-gray-600 text-sm">Comprehensive warranty coverage for peace of mind</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <FailureModal
                isOpen={isErrorModalOpen}
                onClose={() => setIsErrorModalOpen(false)}
            />
            <SuccessModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default ProductDetails;