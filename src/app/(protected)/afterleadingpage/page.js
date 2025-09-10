"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { API } from "@/utils";
import { requireAuth } from "@/utils/auth";
import { ProductCardFirst } from "@/components/product-card/ProductCardFirst";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ProductCardSkeleton } from "@/components/common/LoadingSkeleton";

const AfterLeadingPageContent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(3); // Show 3 products initially
  const productsPerLoad = 3; // Number of products to load each time

  const getProductsList = async () => {
    try {
      setLoading(true);
      const response = await API.get("/products/Get-products");

      if (response.status === 200) {
        // The API returns data in the format: { msg: "...", data: [...] }
        const products = response.data?.data || [];
        
        if (Array.isArray(products) && products.length > 0) {
          setProductList(products);
        } else {
          toast.warning('No products available at the moment.');
          setProductList([]);
        }
      } else {
        const errorMessage = response.data?.msg || "Failed to fetch products. Please try again later.";
        toast.error(errorMessage);
        setProductList([]);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         "An error occurred while fetching products. Please check your connection and try again.";
      toast.error(errorMessage);
      setProductList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Use our auth utility to check authentication
    if (!requireAuth(router)) {
      return; // Redirect handled by requireAuth
    }
    
    // If logged in, fetch products
    getProductsList();
  }, [router]);

  const handleAddToCart = async (item) => {
    try {
      setLoading(true);
      const userSession = localStorage.getItem("userSession");
      const parsedSession = userSession ? JSON.parse(userSession) : null;
      const accessToken = parsedSession?.access_token;

      if (!accessToken) {
        toast.error("Please login to add items to cart");
        router.push('/login');
        return;
      }

      const response = await API.post(
        `/cart/Add-to-cart?productId=${item._id}`,
        {},
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Product added to cart successfully!");
        router.push('/cart');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.response?.data?.msg || "Failed to add product to cart.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePressCard = (item) => {
    router.push(`/product-details/${item._id}`);
  };

  const handleGetAQuote = () => {
    router.push("/contactus");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/90">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Power Your Future With <br className="hidden sm:block" />
              <span className="text-yellow-300">Clean Energy</span> Solutions
            </h1>
            <p className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-blue-100 max-w-3xl mx-auto px-2">
              Join the renewable energy revolution with SologixEnergy. We provide sustainable, 
              cost-effective solar solutions for homes and businesses across India.
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900 mb-3 md:mb-4">Our Solar Solutions</h2>
          <div className="w-16 sm:w-20 h-1 bg-yellow-400 mx-auto"></div>
          <p className="mt-3 md:mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Explore our range of high-efficiency solar products designed for Indian homes and businesses
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[...Array(3)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {productList.slice(0, visibleProducts).map((product) => (
                <div key={product._id} className="flex justify-center">
                  <ProductCardFirst
                    title={product.system || product.name}
                    imageSrc={
                      product.images?.[0]?.url || 
                      (product.system === "On-Grid Solar System" ? "/product-one.png" : "/product-three.png")
                    }
                    description={product.product_description || product.description}
                    productDetails={product.product_details || {}}
                    productId={product._id}
                    onBuyNow={() => handlePressCard(product)}
                    handleAddToCart={() => handleAddToCart(product)}
                    handlePressCard={() => handlePressCard(product)}
                  />
                </div>
              ))}
            </div>
            
            {productList.length > 3 && (
              <div className="flex justify-center mt-6 md:mt-8">
                <button
                  onClick={() => {
                    if (visibleProducts >= productList.length) {
                      setVisibleProducts(3);
                    } else {
                      setVisibleProducts(prev => Math.min(prev + 3, productList.length));
                    }
                  }}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white text-sm sm:text-base rounded-full hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {visibleProducts >= productList.length ? 'Show Less' : 'Load More'}
                  <span className="ml-2">
                    {visibleProducts >= productList.length ? '↑' : '↓'}
                  </span>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Payment Journey Section */}
      <div className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900 mb-3 md:mb-4">Flexible Payment Options</h2>
            <div className="w-16 sm:w-20 h-1 bg-yellow-400 mx-auto"></div>
            <p className="mt-3 md:mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              Choose a payment plan that works best for you and start your solar journey today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12">
            {/* Payment Step 1 */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 relative">
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg">1</div>
              <div className="ml-4 sm:ml-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Initial Payment</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">Secure your solar system with an initial payment</p>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold text-blue-600">₹25,000</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-1/3"></div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">15% of total cost</div>
                </div>
              </div>
            </div>

            {/* Payment Step 2 */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 relative">
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg">2</div>
              <div className="ml-4 sm:ml-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Installment Payments</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">Flexible monthly installments for 12 months</p>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Monthly:</span>
                    <span className="font-semibold text-blue-600">₹12,500</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 w-2/3"></div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">60% of total cost</div>
                </div>
              </div>
            </div>

            {/* Payment Step 3 */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 relative">
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg">3</div>
              <div className="ml-4 sm:ml-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Final Payment</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">Pay the remaining amount upon completion</p>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Remaining:</span>
                    <span className="font-semibold text-blue-600">₹62,500</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-1/4"></div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">25% of total cost</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-12 text-center">
            <button 
              onClick={handleGetAQuote}
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Get Your Custom Payment Plan
            </button>
            <p className="mt-3 md:mt-4 text-xs sm:text-sm text-gray-500 px-2">*Terms and conditions apply. EMI options available.</p>
          </div>
        </div>
      </div>

      {/* Service Section */}
      <div className="bg-gray-100 text-black p-4 sm:p-6 md:p-10 mt-8 md:mt-10 mx-4 rounded-lg max-w-7xl md:mx-auto my-12 md:my-16">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-10">
          Need Service? - Schedule a Visit Today
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-8">
          <div className="w-full lg:w-1/2">
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Book a Free Consultation</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="space-y-1">
                  <label 
                    htmlFor="appointmentDate" 
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select Date
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="date"
                    id="appointmentDate"
                    name="appointmentDate"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-required="true"
                  />
                </div>
                <div className="space-y-1">
                  <label 
                    htmlFor="appointmentTime" 
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select Time
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select 
                    id="appointmentTime"
                    name="appointmentTime"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-required="true"
                  >
                    <option value="">Select a time slot</option>
                    <option value="09:00-10:00">9:00 AM - 10:00 AM</option>
                    <option value="10:00-11:00">10:00 AM - 11:00 AM</option>
                    <option value="11:00-12:00">11:00 AM - 12:00 PM</option>
                    <option value="14:00-15:00">2:00 PM - 3:00 PM</option>
                    <option value="15:00-16:00">3:00 PM - 4:00 PM</option>
                    <option value="16:00-17:00">4:00 PM - 5:00 PM</option>
                  </select>
                </div>
                <button 
                  onClick={handleGetAQuote}
                  className="w-full mt-3 sm:mt-4 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Schedule Free Consultation
                </button>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-4 sm:p-6 md:p-8 rounded-xl h-full flex flex-col justify-center">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Why Choose Us?</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm sm:text-base">Certified solar energy experts</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm sm:text-base">High-quality solar products with warranty</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm sm:text-base">Competitive pricing and financing options</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm sm:text-base">Professional installation and after-sales support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// Wrap the component with requireAuth HOC
export default requireAuth(AfterLeadingPageContent);
