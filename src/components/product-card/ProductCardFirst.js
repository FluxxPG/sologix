import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";

export const ProductCardFirst = ({
    title = "On-Grid Solar System",
    imageSrc,
    description = "2KW suitable for small homes (2-3 Rooms)",
    productDetails = {},
    onBuyNow,
    productId,
    handleAddToCart,
    handlePressCard,
    showAddToCart = true
}) => {
    const [isImageLoading, setIsImageLoading] = useState(true);
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
            className="w-full max-w-xs bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col"
            key={productId} 
            onClick={handlePressCard}
        >
            <div className="flex-1">
                <h2 className="text-xl font-bold text-[#00237D] text-center mb-4 line-clamp-2 min-h-[3rem] flex items-center justify-center">
                    {title}
                </h2>

                <div className="relative w-full flex flex-col items-center mb-6">
                    {imageSrc && (
                        <div className="relative w-full h-40 mb-4">
                            <Image
                                src={imageSrc}
                                alt={`${title} - Solar System`}
                                fill
                                className={`object-contain transition-opacity duration-300 ${
                                    isImageLoading ? 'opacity-0' : 'opacity-100'
                                }`}
                                priority={false}
                                sizes="(max-width: 400px) 100vw, 400px"
                                onLoad={() => setIsImageLoading(false)}
                                onError={() => setIsImageLoading(false)}
                            />
                            {isImageLoading && (
                                <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-lg" />
                            )}
                        </div>
                    )}
                    <p className="text-center text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">
                        {description}
                    </p>
                </div>

                {/* Product Details Table */}
                <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
                    {Object.entries(labels).map(([key, label], index, array) => {
                        const value = key === "Annual_saving" 
                            ? `₹${productDetails[key] || '0'}`
                            : key === "Annual_energy_generation" 
                                ? `${productDetails[key] || '0'} kWh`
                                : `${productDetails[key] || '0'}${units[key] ? ` ${units[key]}` : ''}`;
                        
                        return (
                            <div 
                                key={key} 
                                className={`flex ${index < array.length - 1 ? 'border-b border-gray-100' : ''}`}
                            >
                                <div className="flex-1 p-2.5 bg-gray-50 border-r text-sm text-gray-600">
                                    {label}
                                </div>
                                <div className="flex-1 p-2.5 text-sm text-right font-medium">
                                    {value}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Highlighted Cost to Consumer */}
                <div className="flex justify-between items-center border border-gray-200 p-3.5 rounded-lg mb-6 bg-gray-50">
                    <span className="text-base font-semibold text-gray-800">
                        Cost to Consumer:
                    </span>
                    <span className="text-lg font-bold text-green-600">
                        ₹{productDetails.Cost_to_consumer || '0'}
                    </span>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-auto">
                <Button
                    className="flex-1 bg-[#00237D] text-white rounded-full font-medium
                              hover:bg-[#001a5e] transition-colors duration-200 focus:outline-none
                              focus:ring-2 focus:ring-[#00237D] focus:ring-opacity-50 h-11"
                    onPress={handleBuyNow}
                    isLoading={isBuyingNow}
                    disabled={isBuyingNow || isAddingToCart}
                >
                    {isBuyingNow ? 'Processing...' : 'Buy Now'}
                </Button>
                {showAddToCart && (
                    <Button
                        className="flex-1 border-[#00237D] text-[#00237D] rounded-full font-medium
                                  hover:bg-gray-50 transition-colors duration-200 focus:outline-none
                                  focus:ring-2 focus:ring-[#00237D] focus:ring-opacity-50 h-11"
                        variant="bordered"
                        onPress={handleCartAdd}
                        isLoading={isAddingToCart}
                        disabled={isBuyingNow || isAddingToCart}
                    >
                        {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                    </Button>
                )}
            </div>
        </div>
    );
};
