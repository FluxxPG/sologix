import React from "react";
import SectionHeader from "../common/SectionHeader";

export const AboutUs = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          badge="Our Story"
          title="About"
          highlight="Sologix Energy"
          className="mb-12"
        />

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 backdrop-blur-sm bg-white/80">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 text-center">
              We are a Renewable Energy Company founded by a team of Engineering
              Graduates from IIT, NIT, and DTU with in-depth industry knowledge
              and skills, committed to driving the transition to sustainable energy solutions.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
              <p className="text-gray-700 italic text-lg leading-relaxed">
                "With the increasing GHG emissions and Global Warming threat, we
                recognized the urgent need to combat climate change and help
                limit the Earth's rising temperature through innovative
                renewable energy solutions."
              </p>
            </div>

            <div className="flex justify-center mt-10">
              <a 
                href="/aboutus" 
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-full 
                          shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Discover Our Journey →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
