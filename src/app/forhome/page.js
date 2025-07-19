"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import forhome from "../../../public/solar for home.jpg";
import anillustration from "../../../public/Anillustration.png";
import gridsolor from "../../../public/Group (2).png";
import hybridsolar from "../../../public/Ahybridsolarsystem.png";
import Image from "next/image";
import { Button, Card } from "antd";
import { Select } from "antd";
import SectionHeader from "@/components/common/SectionHeader";

const ForHome = () => {
  const clients = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000, // 3 seconds
    pagination: null,
  };
  return (
    <div className="mb-2">
      <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900/90 to-blue-700/90">
        <div className="absolute inset-0 w-full h-full z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
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
                Home Solar Solutions
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-[1.3] text-white w-full">
              <div className="inline-block pt-1 pb-2">
                <div className="-mt-2">Power Your Home With</div>
                <span 
                  className="block md:inline-block mt-2 md:mt-0 pt-1 pb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300"
                >
                  Solar Energy
                </span>
              </div>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-white/90 -mt-2 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed w-full px-2 sm:px-4">
              Transform your home with sustainable solar solutions. Reduce electricity bills, increase property value, and contribute to a greener future with our comprehensive home solar systems.
            </p>
          </div>
        </div>
      </div>

      {/* On-Grid Solar System Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="On-Grid"
            highlight="Solar System"
            description="The simplest and most cost-effective solution for your home"
            className="mb-12 text-center"
            highlightColor="from-blue-600 to-cyan-500"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center items-center md:items-start">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h3>
              <p className="text-gray-600 leading-relaxed text-center md:text-left">
                This type of Solar PV system interacts with the power grid. It is
                the simplest and most cost-effective PV system suitable for places
                with a continuous power supply. It works best under a net-metering
                arrangement and saves your energy bill. This system can also push
                excess electricity produced to the electric utility grid if the
                load is low or zero. This system does not provide backup power
                during a grid outage, even if the sun is shining.
              </p>
            </div>
            <div className="relative w-full max-w-[600px] mx-auto">
              <Image 
                src={anillustration}
                alt="On-Grid Solar System"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 p-8 md:p-8">
        <Card className="drop-shadow-lg ">
          <div className="flex items-center flex-col mx-auto">
            <h1 className="text-xl font-semibold text-[#00237D] mb-4">
              Hybrid Solar System
            </h1>
            <Image src={gridsolor} className="w-16" />
            <p className="text-center mt-4 mb-5">
              2kW Suitable for Small Home (2-3 Rooms)
            </p>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Search to Select"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={[
                { value: "20 Sqm", label: "Roof Area Required" },
                { value: "3,700 Units", label: "Annual Energy Generation" },
                { value: "54,000 Rs.", label: "Cost to Consumer" },
                { value: "7,000 Rs.", label: "Annual Saving" },
                { value: "	25 Years", label: "System Life" },
                { value: "	4 Years", label: "Payback Period" },
              ]}
            />
            <Button className="mt-5 bg-[#00237D] text-white">Buy Now!</Button>
          </div>
        </Card>
      </div> */}

      {/* Hybrid Solar System Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Hybrid"
            highlight="Solar System"
            description="The perfect blend of grid connectivity and energy independence"
            className="mb-12 text-center"
            highlightColor="from-blue-600 to-cyan-500"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative w-full max-w-[600px] mx-auto">
              <Image 
                src={hybridsolar}
                alt="Hybrid Solar System"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-center items-center md:items-start">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Benefits</h3>
              <p className="text-gray-600 leading-relaxed text-center md:text-left">
                This type of Solar PV system interacts with the power grid. It is
                the simplest and most cost-effective PV system suitable for places
                with a continuous power supply. It works best under a net-metering
                arrangement and saves your energy bill. This system can also push
                excess electricity produced to the electric utility grid if the
                load is low or zero. This system does not provide backup power
                during a grid outage, even if the sun is shining.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 p-8 md:p-8">
        <Card className="drop-shadow-lg ">
          <div className="flex items-center flex-col mx-auto">
            <h1 className="text-xl font-semibold text-[#00237D] mb-4">
              Hybrid Solar System
            </h1>
            <Image src={gridsolor} className="w-16" />
            <p className="text-center mt-4 mb-5">
              2kW Suitable for Small Home (2-3 Rooms)
            </p>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Search to Select"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={[
                { value: "20 Sqm", label: "Roof Area Required" },
                { value: "3,700 Units", label: "Annual Energy Generation" },
                { value: "54,000 Rs.", label: "Cost to Consumer" },
                { value: "7,000 Rs.", label: "Annual Saving" },
                { value: "	25 Years", label: "System Life" },
                { value: "	4 Years", label: "Payback Period" },
              ]}
            />
            <Button className="mt-5 bg-[#00237D] text-white">Buy Now!</Button>
          </div>
        </Card>
        
      </div> */}


    </div>
  );
};

export default ForHome;
