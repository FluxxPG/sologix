"use client";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation";
import { API } from "@/utils";
import { toast } from "sonner";
import { ProductCardFirst } from "../product-card/ProductCardFirst";
import { useSelector } from "react-redux";
import SectionHeader from "../common/SectionHeader";
import { resetUsedImages } from "@/utils/productImages";

export const ExploreProducts = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState(null);
  const session = useSelector((state) => state.session);

  const getProductsList = async () => {
    try {
      setLoading(true);
      const response = await API.get("/products/Get-products");

      if (response.status === 200) {
        setProductList(response.data.data);
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

  useEffect(() => {
    // Reset used images for fresh unique images
    resetUsedImages();
    getProductsList();
  }, []);

  const handleBuyNow = (productId) => {
    if (session && session.userSession) {
      // User is logged in, redirect to product details page
      router.push(`/product-details/${productId}`);
    } else {
      // User is not logged in, redirect to login page
      // Store the product ID in session storage to redirect after login
      sessionStorage.setItem("redirectProductId", productId);
      router.push("/login");
    }
  };
  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          badge="Our Offerings"
          title="Explore our"
          highlight="Products"
          description="Discover our range of high-quality solar energy solutions"
          className="mb-12"
        />
      <div className="w-full">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto whitespace-nowrap p-4 md:p-8">
            <div className="flex space-x-5">
              {productList?.map((card) => (
                <ProductCardFirst
                  key={card._id}
                  title={card.system}
                  description={card.product_description}
                  productDetails={card.product_details}
                  productType={card.system}
                  onBuyNow={() => handleBuyNow(card._id)}
                  productId={card._id}
                  handleAddToCart={() => { }}
                  handlePressCard={() => { }}
                  showAddToCart={false}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      </div>
    </section>
  );
};
