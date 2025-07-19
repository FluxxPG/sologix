import React from 'react';
import { Card, CardBody } from "@nextui-org/react";
import { FaSolarPanel, FaMoneyBillWave, FaUserTie, FaLeaf } from 'react-icons/fa';
import SectionHeader from "../common/SectionHeader";

export const PMSuryaGhar = () => {
  const features = [
    {
      icon: <FaMoneyBillWave className="text-4xl text-blue-600 mb-3" />,
      title: "Financial Assistance and Direct Subsidy",
      description: "Beneficiaries will receive direct subsidy in their bank accounts, along with access to low-interest bank loans. This ensures there is no financial burden on individuals while installing rooftop solar panels."
    },
    {
      icon: <FaSolarPanel className="text-4xl text-green-600 mb-3" />,
      title: "Free Electricity and Extra Income",
      description: "Households will receive up to 300 units of free electricity every month, reducing their electricity bills. Any excess electricity can be sold back to local DISCOMs, allowing families to earn extra income."
    },
    {
      icon: <FaUserTie className="text-4xl text-amber-600 mb-3" />,
      title: "Employment Opportunities for Youth",
      description: "This scheme will generate large-scale employment in solar panel manufacturing, installation, and maintenance, creating new job roles for technically skilled youth."
    },
    {
      icon: <FaLeaf className="text-4xl text-emerald-600 mb-3" />,
      title: "Promotion of Clean and Green Energy",
      description: "By encouraging solar energy adoption, the scheme will reduce dependency on non-renewable sources, support EV charging infrastructure, and contribute to a cleaner, greener environment."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          badge="Government Initiative"
          title="Pradhan Mantri Surya Ghar"
          highlight="Muft Bijli Yojana"
          description="Empowering households with free solar energy and financial benefits"
          className="mb-12"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-center text-gray-800 mb-6">
            Objective of PM Surya Ghar Muft Bijli Yojana
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed text-center mb-6">
            Under the PM Surya Ghar Muft Bijli Yojana, 1 crore (10 million) households will receive 300 units of free electricity every month. This scheme will result in annual savings of ₹15,000 crore for these families. Additionally, they can sell surplus power generated from solar panels to their local power distribution companies (DISCOMs), generating extra income.
          </p>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed text-center">
            The initiative will boost electric vehicle (EV) charging infrastructure, and the increased demand for solar panel supply and installation will create large-scale entrepreneurial opportunities for vendors. Moreover, the manufacturing, installation, and maintenance of solar panels will generate abundant employment opportunities for technically skilled youth.
          </p>
        </SectionHeader>
        


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardBody className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[#00237D] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PMSuryaGhar;
