"use client";
import React from "react";
import electroniccar from "../../../public/eletronic-car.png";
import illustration from "../../../public/illustration-electric-car.png";
import Image from "next/image";
import { FaLeaf, FaSun, FaBolt, FaShieldAlt } from 'react-icons/fa';
import SectionHeader from "@/components/common/SectionHeader";

const benefits = [
  {
    icon: <FaSun className="text-blue-600 text-xl" />,
    title: "Financial Savings",
    description: "Generate your own electricity and receive credits for excess power, significantly reducing your electricity bills over time.",
    bg: "blue-100"
  },
  {
    icon: <FaLeaf className="text-green-600 text-xl" />,
    title: "Renewable Energy",
    description: "Encourage the adoption of clean energy and reduce reliance on fossil fuels for a more sustainable future.",
    bg: "green-100"
  },
  {
    icon: <FaShieldAlt className="text-amber-600 text-xl" />,
    title: "Grid Stability",
    description: "Help balance electricity supply and demand by feeding excess power back into the grid during peak times.",
    bg: "amber-100"
  }
];

const hybridBenefits = [
  {
    title: "Enhanced Reliability",
    description: "Hybrid systems combine solar power with other energy sources, ensuring continuous power supply even when sunlight is limited.",
    color: "text-blue-600"
  },
  {
    title: "Cost Efficiency",
    description: "By optimizing energy production from multiple sources, hybrid plants can significantly reduce energy costs.",
    color: "text-green-600"
  },
  {
    title: "Energy Independence",
    description: "Reduce dependence on the grid and protect against power outages with a system that can operate independently.",
    color: "text-amber-600"
  },
  {
    title: "Environmental Benefits",
    description: "Lower carbon footprint and reduced reliance on fossil fuels for a cleaner, more sustainable future.",
    color: "text-purple-600"
  }
];

const Resource = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900/90 to-blue-700/90">
        <div className="absolute inset-0 w-full h-full z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80)',
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
                Educational Resources
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-[1.3] text-white w-full">
              <div className="inline-block pt-1 pb-2">
                <div className="-mt-2">Solar Energy</div>
                <span 
                  className="block md:inline-block mt-2 md:mt-0 pt-1 pb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300"
                >
                  Knowledge Hub
                </span>
              </div>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-white/90 -mt-2 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed w-full px-2 sm:px-4">
              Empowering you with the knowledge to make informed decisions about solar energy solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Net Metering Section */}
      <div id="net-metering" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <Image 
              src={electroniccar} 
              alt="Net Metering" 
              className="rounded-lg shadow-xl"
              priority
            />
          </div>
          <div className="w-full md:w-1/2">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-blue-100 rounded-full mr-4">
                <FaBolt className="text-blue-600 text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                What is Net Metering?
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Net metering is a billing arrangement that allows homeowners and
              businesses with renewable energy systems, such as solar panels, to
              receive credit for the excess electricity they generate and feed
              back into the grid.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Under a net metering program, a bi-directional meter tracks the energy 
              generated by the renewable energy system and the energy consumed by the 
              customer. If you generate more electricity than you consume, the excess 
              electricity is fed back into the grid and credited to your account. This 
              credit can then be used to offset the cost of electricity that is consumed 
              during periods when your system is not generating electricity, such as at 
              night or on cloudy days.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeader 
          title="Benefits of"
          highlight="Net Metering"
          className="mb-8"
        />
        <ul className="list-disc leading-7 mb-3">
          <li>
            Financial savings: Net metering allows homeowners and businesses to
            generate their own electricity and receive credit for the excess
            electricity they generate, which can help to offset their
            electricity bills. This can result in significant financial savings
            over time.
          </li>
        </ul>
        <ul className="list-disc leading-7 mb-3">
          <li>
            Increased use of renewable energy: Net metering can encourage the
            adoption of renewable energy systems, such as solar panels, by
            making them more financially viable. This can help to reduce
            reliance on fossil fuels and promote a transition to cleaner energy
            sources.
          </li>
        </ul>
        <ul className="list-disc leading-7 mb-3">
          <li>
            Reduced greenhouse gas emissions: By promoting the use of renewable
            energy, net metering can help to reduce greenhouse gas emissions and
            mitigate the impacts of climate change.
          </li>
        </ul>
        <ul className="list-disc leading-7 mb-3">
          <li>
            Improved grid stability: Net metering can help to improve grid
            stability by reducing the strain on the grid during peak demand
            periods. This is because excess electricity generated by solar
            panels can be fed back into the grid, helping to balance the supply
            and demand of electricity.
          </li>
        </ul>
        <ul className="list-disc leading-7 mb-3">
          <li>
            Job creation: The adoption of renewable energy systems through net
            metering can also create jobs in the renewable energy sector,
            contributing to the growth of the local economy.
          </li>
        </ul>
        <p>
          However, it is important to note that the benefits of net metering can
          vary depending on the specific policies and regulations in place, as
          well as the local electricity market conditions.
        </p>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Key Benefits of"
            highlight="Net Metering"
            description="Discover how net metering can transform your energy consumption and contribute to a sustainable future."
            className="mb-12 text-center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className={`bg-${benefit.bg} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How Net Metering Works Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Net Metering Works
            </h2>
            <p className="text-gray-600 mb-6">
              Our advanced metering technology ensures you get the most out of your solar investment by accurately tracking energy production and consumption.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <span className="text-gray-700">Bi-directional metering tracks energy flow in both directions</span>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <span className="text-gray-700">Credits for excess energy fed back to the grid</span>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <span className="text-gray-700">Seamless integration with your existing utility service</span>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Image 
                src={illustration} 
                alt="Net Metering Illustration" 
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hybrid Solar Plants Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Benefits of"
            highlight="Hybrid Solar Plants"
            description="Combining the best of solar energy with other power sources for maximum efficiency and reliability."
            className="mb-12 text-center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {hybridBenefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className={`text-xl font-semibold mb-4 ${benefit.color}`}>
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>


        </div>
      </div>
      {/* Rooftop Solar Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Benefits of"
            highlight="Rooftop Solar"
            className="mb-12 text-center"
          />
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <li className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-blue-600">Energy Independence</h3>
              <p className="text-gray-600">
                Generate your own clean energy and reduce reliance on the grid, protecting against rising energy costs.
              </p>
            </li>
            <li className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-green-600">Cost Savings</h3>
              <p className="text-gray-600">
                Significantly reduce or even eliminate your electricity bills with a properly sized solar system.
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Go <span className="text-white">Solar?</span>
            </h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
              Discover how our solar solutions can transform your energy consumption and help you save on electricity bills.
            </p>
            <div className="mt-8">
              <button className="bg-white text-blue-700 hover:bg-blue-50 font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                Get a Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resource;
