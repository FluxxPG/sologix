"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { API } from "@/utils";
import { requireAuth } from "@/utils/auth";
import { ProductCardFirst } from "@/components/product-card/ProductCardFirst";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const AfterLeadingPageContent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(3); // Show 3 products initially
  const productsPerLoad = 3; // Number of products to load each time

  const getProductsList = async () => {
    try {
      setLoading(true);
      console.log('Fetching products...');
      const response = await API.get("/products/Get-products");
      console.log('API Response:', response);

      if (response.status === 200) {
        // The API returns data in the format: { msg: "...", data: [...] }
        const products = response.data?.data || [];
        
        if (Array.isArray(products) && products.length > 0) {
          console.log('Products loaded successfully:', products);
          setProductList(products);
        } else {
          console.warn('No products found in response');
          toast.warning('No products available at the moment.');
          setProductList([]);
        }
      } else {
        console.error("Unexpected response status:", response.status, response);
        const errorMessage = response.data?.msg || "Failed to fetch products. Please try again later.";
        toast.error(errorMessage);
        setProductList([]);
      }
    } catch (error) {
      console.error("API Error:", error);
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
            "authorization": `token ${accessToken}`,
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
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Power Your Future With <br />
              <span className="text-yellow-300">Clean Energy</span> Solutions
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
              Join the renewable energy revolution with SologixEnergy. We provide sustainable, 
              cost-effective solar solutions for homes and businesses across India.
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Solar Solutions</h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our range of high-efficiency solar products designed for Indian homes and businesses
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productList.slice(0, visibleProducts).map((product) => (
                <ProductCardFirst
                  key={product._id}
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
              ))}
            </div>
            
            {productList.length > 3 && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => {
                    if (visibleProducts >= productList.length) {
                      setVisibleProducts(3);
                    } else {
                      setVisibleProducts(prev => Math.min(prev + 3, productList.length));
                    }
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Flexible Payment Options</h2>
            <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Choose a payment plan that works best for you and start your solar journey today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Payment Step 1 */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">1</div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Initial Payment</h3>
                <p className="text-gray-600 mb-4">Secure your solar system with an initial payment</p>
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
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">2</div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Installment Payments</h3>
                <p className="text-gray-600 mb-4">Flexible monthly installments for 12 months</p>
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
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">3</div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Final Payment</h3>
                <p className="text-gray-600 mb-4">Pay the remaining amount upon completion</p>
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

          <div className="mt-12 text-center">
            <button 
              onClick={handleGetAQuote}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Get Your Custom Payment Plan
            </button>
            <p className="mt-4 text-sm text-gray-500">*Terms and conditions apply. EMI options available.</p>
          </div>
        </div>
      </div>

      {/* Service Section */}
      <div className="bg-gray-100 text-black p-6 md:p-10 mt-10 rounded-lg max-w-7xl mx-auto my-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-10">
          Need Service? - Schedule a Visit Today
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="w-full md:w-1/2">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Book a Free Consultation</h3>
              <div className="space-y-4">
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
                  className="w-full mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Schedule Free Consultation
                </button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 rounded-xl h-full flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-yellow-400 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Certified solar energy experts</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-yellow-400 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>High-quality solar products with warranty</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-yellow-400 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Competitive pricing and financing options</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-yellow-400 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Professional installation and after-sales support</span>
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
