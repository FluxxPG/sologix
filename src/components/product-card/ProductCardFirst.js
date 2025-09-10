import { Button } from "@nextui-org/react";
import { useState } from "react";
import ProductImageGallery from "@/components/common/ProductImageGallery";

export const ProductCardFirst = ({
    title = "On-Grid Solar System",
    imageSrc,
    description = "2KW suitable for small homes (2-3 Rooms)",
    productDetails = {},
    onBuyNow,
    productId,
    handleAddToCart,
    handlePressCard,
    showAddToCart = true,
    productType = null
}) => {
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [isBuyingNow, setIsBuyingNow] = useState(false);

    const labels = {
        Roof_area_required: "Roof Area Required",
        Annual_energy_generation: "Annual Energy Generation",
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

    const handleBuyNow = async () => {
        if (!onBuyNow && !handlePressCard) return;
        
        setIsBuyingNow(true);
        try {
            if (onBuyNow) {
                await onBuyNow();
            } else if (handlePressCard) {
                await handlePressCard();
            }
        } finally {
            setIsBuyingNow(false);
        }
    };

    const handleCartAdd = async () => {
        if (!handleAddToCart) return;
        
        setIsAddingToCart(true);
        try {
            await handleAddToCart();
        } finally {
            setIsAddingToCart(false);
        }
    };

    return (
        <div 
            className="w-full max-w-sm bg-white rounded-2xl shadow-lg border border-gray-100 p-5 sm:p-6 cursor-pointer hover:shadow-2xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] h-full flex flex-col group"
            key={productId} 
            onClick={handlePressCard}
        >
            <div className="flex-1">
                <h2 className="text-lg sm:text-xl font-bold text-[#00237D] text-center mb-4 sm:mb-5 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] flex items-center justify-center group-hover:text-blue-600 transition-colors duration-300">
                    {title}
                </h2>

                <div className="relative w-full flex flex-col items-center mb-5 sm:mb-6">
                    <div className="w-full mb-3 sm:mb-4 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
                        <ProductImageGallery
                            productType={productType || title}
                            productName={title}
                            className="w-full"
                            showGallery={false}
                            imageHeight="h-40 sm:h-48 md:h-52 lg:h-56"
                        />
                    </div>
                    <p className="text-center text-sm sm:text-base text-gray-600 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Product Details Table */}
                <div className="border border-gray-200 rounded-xl overflow-hidden mb-5 sm:mb-6 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                    {Object.entries(labels).map(([key, label], index, array) => {
                        const value = key === "Annual_saving" 
                            ? `₹${productDetails[key] || '0'}`
                            : key === "Annual_energy_generation" 
                                ? `${productDetails[key] || '0'} kWh`
                                : `${productDetails[key] || '0'}${units[key] ? ` ${units[key]}` : ''}`;
                        
                        return (
                            <div 
                                key={key} 
                                className={`flex ${index < array.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50 transition-colors duration-200`}
                            >
                                <div className="flex-1 p-3 sm:p-3.5 bg-gradient-to-r from-gray-50 to-gray-100 border-r text-sm sm:text-base text-gray-700 font-medium">
                                    {label}
                                </div>
                                <div className="flex-1 p-3 sm:p-3.5 text-sm sm:text-base text-right font-semibold text-gray-900">
                                    {value}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Highlighted Cost to Consumer */}
                <div className="flex justify-between items-center border-2 border-blue-200 p-4 sm:p-5 rounded-xl mb-5 sm:mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 group-hover:from-blue-100 group-hover:to-indigo-100 group-hover:border-blue-300 transition-all duration-300">
                    <span className="text-base sm:text-lg font-bold text-gray-800">
                        Cost to Consumer:
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-green-600 group-hover:text-green-700 transition-colors duration-300">
                        ₹{productDetails.Cost_to_consumer || '0'}
                    </span>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-auto pt-3">
                <Button
                    className="w-full sm:flex-1 bg-gradient-to-r from-[#00237D] to-blue-700 text-white rounded-xl font-semibold text-sm sm:text-base
                              hover:from-[#001a5e] hover:to-blue-800 hover:shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none
                              focus:ring-2 focus:ring-[#00237D] focus:ring-opacity-50 h-12 sm:h-13 min-h-[3rem] shadow-md"
                    onPress={handleBuyNow}
                    isLoading={isBuyingNow}
                    disabled={isBuyingNow || isAddingToCart}
                >
                    {isBuyingNow ? 'Processing...' : 'Buy Now'}
                </Button>
                {showAddToCart && (
                    <Button
                        className="w-full sm:flex-1 border-2 border-[#00237D] text-[#00237D] rounded-xl font-semibold text-sm sm:text-base
                                  hover:bg-[#00237D] hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none
                                  focus:ring-2 focus:ring-[#00237D] focus:ring-opacity-50 h-12 sm:h-13 min-h-[3rem]
                                  bg-white shadow-md group-hover:border-blue-600"
                        variant="bordered"
                        onPress={handleCartAdd}
                        isLoading={isAddingToCart}
                        disabled={isBuyingNow || isAddingToCart}
                    >
                        <span className="flex items-center justify-center gap-2">
                            {isAddingToCart ? (
                                'Adding...'
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.68 9H17M7 13v8a2 2 0 002 2h6a2 2 0 002-2v-8m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4.01" />
                                    </svg>
                                    <span className="hidden sm:inline">Add to Cart</span>
                                    <span className="sm:hidden">Cart</span>
                                </>
                            )}
                        </span>
                    </Button>
                )}
            </div>
        </div>
    );
};
