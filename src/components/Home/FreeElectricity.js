"use client";
import React, { useState } from "react";
import { Button, Card } from "@nextui-org/react";
import { FaSolarPanel, FaMoneyBillWave, FaIndustry, FaLeaf } from "react-icons/fa";

export const FreeElectricity = () => {
  const [showAll, setShowAll] = useState(false);

  const cards = [
    {
      id: 1,
      icon: <FaMoneyBillWave className="text-4xl text-[#00237D] mb-3" />,
      title: "Financial Assistance & Subsidy",
      description: "Avail heavy subsidies and easy bank loans directly credited to your account, ensuring zero financial burden on beneficiaries.",
    },
    {
      id: 2,
      icon: <FaSolarPanel className="text-4xl text-[#00237D] mb-3" />,
      title: "Free Electricity Generation",
      description: "Generate up to 300 units of free electricity every month, leading to significant savings on your electricity bills.",
    },
    {
      id: 3,
      icon: <FaIndustry className="text-4xl text-[#00237D] mb-3" />,
      title: "Employment Opportunities",
      description: "Create new business and employment opportunities in solar panel manufacturing, installation, and maintenance sectors.",
    },
    {
      id: 4,
      icon: <FaLeaf className="text-4xl text-[#00237D] mb-3" />,
      title: "Green Energy Initiative",
      description: "Contribute to environmental conservation by adopting clean, renewable solar energy and reducing carbon footprint.",
    },
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[#00237D] mb-4">
          Benefits of Solar Energy
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Discover how solar energy can transform your home and contribute to a sustainable future with our comprehensive solutions.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card) => (
          <Card
            key={card.id}
            className="p-6 hover:shadow-lg transition-all duration-300 h-full flex flex-col items-center text-center bg-white rounded-xl"
          >
            {card.icon}
            <h3 className="text-xl font-bold mb-3 text-[#00237D]">
              {card.title}
            </h3>
            <p className="text-gray-600">{card.description}</p>
          </Card>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Button
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-6 text-lg font-semibold hover:opacity-90 transition-opacity"
          onPress={() => {}}
        >
          Calculate Your Savings
        </Button>
      </div>
    </div>
  );
};
