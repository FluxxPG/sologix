import { Button, Card } from "@nextui-org/react";
import productThree from "../../../public/product-three.png"
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const ProductCardThird = () => {
        const router = useRouter();

    const specifications = [
        { label: "Roof Area Required", value: "20 Sqm" },
        { label: "Annual Energy Generation", value: "3,700 Units" },
        { label: "Cost to Consumer", value: "As per design" },
        { label: "Annual Saving", value: "7,000 Rs." },
        { label: "System Life", value: "25 Years" },
        { label: "Payback Period", value: "5-7 Years" }
    ];
    const handleAddToCart = () => {
        router.push('/product-details');
        toast.success("Added to cart!");
    };

    return (
        <div className="w-[320px] bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#00237D] text-center mb-4">
                Hybrid Solar System    
            </h2>

            <div className="relative w-full flex flex-col items-center mb-4">
                <Image
                    src={productThree}
                    alt='hybrid solar system'
                    width={80}
                    height={80}
                    className="object-cover mb-4"
                />
                <p className="text-center text-sm font-medium">
                    2KW suitable for small homes (2-3 Rooms)    
                </p>
            </div>

            <div className="border rounded-lg overflow-hidden mb-4">
                {specifications.map((spec, index) => (
                    <div key={index} className={`flex ${index !== specifications.length - 1 ? 'border-b' : ''}`}>
                        <div className="flex-1 p-2 bg-gray-50 border-r text-sm">
                            {spec.label}
                        </div>
                        <div className="flex-1 p-2 text-sm text-right">
                            {spec.value}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-2">
                <Button 
                    className="flex-1 bg-[#00237D] text-white rounded-full"
                >
                    Buy Now!
                </Button>
                <Button 
                    className="flex-1 border-[#00237D] text-[#00237D]"
                    variant="bordered"
                    radius="full"
                    onPress={handleAddToCart}
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    );
};