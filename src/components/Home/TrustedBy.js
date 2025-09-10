"use client";
import React, { useState, useEffect } from "react";
import img from "../../../public/Group.png";
import img2 from "../../../public/unnamed (3) 1.png";
import img3 from "../../../public/Ayana-Renewable-energy 1.png";
import img4 from "../../../public/unnamed (1) 1.png";
import img5 from "../../../public/Germi-Logo 1.png";
import img6 from "../../../public/g3344.png";
import img7 from "../../../public/logo 1.png";
import img8 from "../../../public/sakra 1.png";
import img9 from "../../../public/Group (1).png";
import Image from "next/image";
import { Card } from "@nextui-org/react";
import SectionHeader from "../common/SectionHeader";

export const TrustedBy = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const brandLogos = [
    { src: img, alt: 'Trusted by company 1' },
    { src: img2, alt: 'Trusted by company 2' },
    { src: img3, alt: 'Trusted by company 3' },
    { src: img6, alt: 'Trusted by company 4' },
    { src: img7, alt: 'Trusted by company 5' },
    { src: img8, alt: 'Trusted by company 6' },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          badge="Our Partners"
          title="Trusted"
          highlight="By"
          description="Join our growing list of satisfied clients and industry leaders"
          className="mb-12"
        />

        <Card className={`w-full p-6 md:p-8 bg-white/50 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {brandLogos.map((item, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:-translate-y-1 group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                } animate-float`}
                style={{
                  animationDelay: `${index * 200}ms`,
                  animation: isVisible ? `fadeInUp 0.6s ease-out forwards, float 4s ease-in-out infinite ${index * 0.5}s` : 'none'
                }}
              >
                <div className="relative w-full h-16 md:h-20 flex items-center justify-center">
                  <Image 
                    src={item.src} 
                    alt={item.alt} 
                    width={120}
                    height={80}
                    sizes="(max-width: 640px) 25vw, (max-width: 1024px) 33.33vw, 16.66vw"
                    className="object-contain p-1 w-auto h-auto max-w-[100px] max-h-[60px] md:max-w-[120px] md:max-h-[80px] group-hover:scale-110 transition-transform duration-300"
                    priority={index < 3}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};
