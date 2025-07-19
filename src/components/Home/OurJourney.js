import React from "react";
import Image from "next/image";
import solarImg from "../../../public/Vector (3).png";
import greenEnergyImg from "../../../public/Vector (4).png";
import co2Img from "../../../public/Group (4).png";
import treesPlantedImg from "../../../public/Group (5).png";
import SectionHeader from "../common/SectionHeader";

export const OurJourney = () => {
  const milestones = [
    { 
      image: solarImg, 
      title: "Projects Completed", 
      count: "50+",
      description: "Successful installations across residential and commercial sectors"
    },
    { 
      image: greenEnergyImg, 
      title: "Green Energy Initiatives", 
      count: "30+",
      description: "Sustainable energy projects reducing carbon footprint"
    },
    { 
      image: co2Img, 
      title: "CO2 Reduction", 
      count: "20%",
      description: "Average reduction in carbon emissions for our clients"
    },
    { 
      image: treesPlantedImg, 
      title: "Trees Planted", 
      count: "500+",
      description: "Contributing to a greener environment"
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
        badge="Milestones"
        title="Our"
        highlight="Journey"
        description="Committed to sustainable energy solutions that make a difference"
      />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((milestone, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="relative w-10 h-10">
                  <Image
                    src={milestone.image}
                    alt={milestone.title}
                    fill
                    className="object-contain text-blue-600"
                    sizes="40px"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">
                {milestone.count}
              </h3>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {milestone.title}
              </h4>
              <p className="text-gray-600 text-sm">
                {milestone.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
