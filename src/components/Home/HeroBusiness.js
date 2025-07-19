"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export const HeroBusiness = () => {
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
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [words.length]);

  const handlePressGetAQuote = () => {
    router.push("/contactus");
  };

  const handleLearnMore = () => {
    router.push("/about");
  };

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900/90 to-blue-700/90">
      <div className="absolute inset-0 w-full h-full z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 z-10 py-12 md:py-20 relative">
        <div className="flex flex-col items-center text-center w-full max-w-4xl mx-auto px-2 sm:px-4">
          <div className="mb-6">
            <span className="inline-block px-6 py-2.5 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white text-sm font-medium shadow-lg shadow-blue-500/10">
              Business Solar Solutions
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-[1.3] text-white w-full">
            <div className="inline-block pt-1 pb-2">
              <div className="-mt-2">Power Your Business With <span 
                className={`inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 transition-all duration-500 ease-in-out ${
                  isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}
              >
                {words[currentWordIndex]}
              </span></div>
            </div>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-white/90 -mt-2 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed w-full px-2 sm:px-4">
            Transform your business with sustainable solar solutions. Reduce costs, increase efficiency, and contribute to a greener future.
          </p>
        </div>
      </div>
    </div>
  );
};
