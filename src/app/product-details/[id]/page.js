"use client"
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import SuccessModal from "@/components/Modals/SuccessModal";
import { API } from "@/utils";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { message } from "antd";
import FailureModal from "@/components/Modals/FailureModal";
import Invoice from "@/components/Invoice/Invoice";
import RazorpayCheckout from "@/components/Payments/RazorpayCheckout";

const ProductDetails = () => {
    const { id } = useParams();
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
                amount_paid: total,
                productNames: [getProduct.name]
            }, {
                headers: {
                    'Authorization': `Bearer ${session.userSession?.token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.status === 200) {
                toast.success("Payment details stored successfully!");
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
            <div className="flex items-center justify-center h-40">
                <p className="text-lg font-medium text-gray-500 animate-pulse">Loading...</p>
            </div>
        );

    if (!getProduct)
        return (
            <div className="flex items-center justify-center h-40">
                <p className="text-lg font-medium text-red-500">No product found.</p>
            </div>
        );


    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="relative w-full aspect-square max-w-[400px] mx-auto">
                        <Image
                            src={getProduct.system == "On-Grid Solar System" ? "/product-one.png" : "/product-three.png"}
                            alt="On-Grid Solar System"
                            fill
                            className="object-contain"
                            sizes="(max-width: 400px) 100vw, 400px"
                            priority
                        />
                    </div>
                </div>

                {/* Product Details */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                    <h1 className="text-3xl font-bold text-[#00237D] mb-4">
                        {getProduct.system}
                    </h1>
                    <p className="text-gray-600 mb-6 text-md">
                        {getProduct.product_description}
                    </p>

                    <div className="border rounded-lg overflow-hidden mb-6">
                        {Object.entries(labels).map(([key, label], index) => (
                            <div key={key} className={`flex ${index !== Object.keys(labels).length - 1 ? "border-b" : ""}`}>
                                <div className="flex-1 p-2 bg-gray-50 border-r text-md">{label}</div>
                                <div className="flex-1 p-2 text-md text-right font-bold">
                                    {getProduct.product_details[key] + (units[key] ? " " + units[key] : "")}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quantity Counter */}
                    {/* <div className="flex items-center gap-4 mb-6">
                        <span className="text-gray-700">Quantity:</span>
                        <div className="flex items-center border rounded-lg">
                            <button
                                onClick={handleDecrement}
                                className="px-4 py-2 text-[#00237D] hover:bg-gray-100"
                            >
                                -
                            </button>
                            <span className="px-4 py-2 border-x">
                                {quantity}
                            </span>
                            <button
                                onClick={handleIncrement}
                                className="px-4 py-2 text-[#00237D] hover:bg-gray-100"
                            >
                                +
                            </button>
                        </div>
                    </div> */}
                    <p className="text-gray-500 text-lg font-medium mt-4 text-right">Subtotal: <span className="text-black"> ₹{cost.toFixed(2)}</span></p>
                    <p className="text-gray-500 text-lg font-medium mt-1 text-right">Tax (18%): <span className="text-black"> ₹{tax.toFixed(2)}</span></p>

                    <p className="text-2xl font-semibold mt-4 text-right">Total Cost: <span className="text-green-600"> ₹{total}</span></p>

                    {session.userSession ? (
                        <RazorpayCheckout
                            amount={total}
                            productData={getProduct}
                            userId={session.userSession?.id}
                            onPaymentSuccess={handlePaymentSuccess}
                            onPaymentError={handlePaymentError}
                            buttonText={`Proceed to Checkout (₹${total.toFixed(2)})`}
                            userDetails={{
                                name: `${session.userSession?.firstName || ''} ${session.userSession?.lastName || ''}`,
                                email: session.userSession?.email || '',
                                phone: session.userSession?.phone || ''
                            }}
                        />
                    ) : (
                        <Button
                            className="bg-[#00237D] text-white rounded-full mt-5 w-full"
                            onClick={() => {
                                // Store the product ID to redirect back after login
                                sessionStorage.setItem("redirectProductId", id);
                                router.push('/login');
                            }}
                        >
                            Login to Proceed
                        </Button>
                    )}
                    {purchaseCompleted && !isModalOpen && !showInvoice && (
                        <div className="mt-6 text-center">
                            <Button
                                className="bg-white text-[#00237D] border border-[#00237D] rounded-full mt-5"
                                onClick={() => setShowInvoice(true)}
                            >
                                See Invoice
                            </Button>
                        </div>
                    )}

                    {showInvoice && <Invoice crossPress={() => setShowInvoice(false)} price={getProduct.product_details.Cost_to_consumer} />}
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