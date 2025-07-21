
"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import SectionHeader from "@/components/common/SectionHeader";

export const Hero = ({ badge = true }) => {
  const router = useRouter();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ['Solar Energy', 'Green Energy', 'Clean Power', 'Renewable Energy'];
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsAnimating(false);
      }, 500); // Half of the animation duration
    }, 3000); // Change word every 3 seconds

    return () => clearInterval(interval);
  }, [words.length]);

  const handlePressGetAQuote = () => {
    router.push("/contactus");
  };

  const handleLearnMore = () => {
    router.push("/about");
  };
  
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 z-10 py-12 md:py-20 relative">
        <div className="flex flex-col items-center text-center w-full max-w-4xl mx-auto px-2 sm:px-4">
          <div className="text-center max-w-4xl mx-auto mb-12 text-white">
            {badge && (
              <div className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                <span className="flex h-2 w-2 mr-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/50"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span className="text-sm font-medium text-white">Clean Energy Solutions</span>
              </div>
            )}
            <h2 className={`text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6`}>
              Power Your Future With{" "}
              <span 
                className={`block md:inline-block mt-2 md:mt-0 pt-1 pb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 transition-all duration-500 ease-in-out ${
                  isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}
              >
                {words[currentWordIndex]}
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mt-6 max-w-2xl mx-auto leading-relaxed">
              Join the renewable energy revolution. Our solar solutions provide clean, sustainable power while saving you money and protecting the planet.
            </p>
          </div>
          

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
            {[
              { value: '25+', label: 'Years Experience' },
              { value: '10K+', label: 'Panels Installed' },
              { value: '100%', label: 'Customer Satisfaction' },
              { value: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">{stat.value}</div>
                <div className="text-sm text-gray-700 mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
