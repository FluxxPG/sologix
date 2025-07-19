"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export const PartnerHero = () => {
  const router = useRouter();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ['Solar Business', 'Renewable Energy', 'Clean Power', 'Sustainable Future'];
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

  const handleGetStarted = () => {
    document.getElementById('partnerForm')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 py-12 md:py-20 relative">
        <div className="flex flex-col items-center text-center w-full max-w-4xl mx-auto px-2 sm:px-4">
          <div className="mb-6">
            <span className="inline-block px-6 py-2.5 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white text-sm font-medium shadow-lg shadow-blue-500/10">
              Join Our Network
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-[1.3] text-white w-full">
            <div className="inline-block pt-1 pb-2">
              <div className="-mt-2">Become a Partner in</div>
              <span 
                className={`block md:inline-block mt-2 md:mt-0 pt-1 pb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200 transition-all duration-500 ease-in-out ${
                  isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}
              >
                {words[currentWordIndex]}
              </span>
            </div>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-white/90 -mt-2 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed w-full px-2 sm:px-4">
            Join our network of solar energy partners and be part of India's renewable energy revolution. Grow your business with our support and expertise.
          </p>
        </div>
      </div>
    </div>
  );
};
