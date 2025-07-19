"use client";
import React from "react";
import Image from "next/image";
import { Button, Card, Checkbox, Form, Input, Select } from "antd";
import { HeroBusiness } from "@/components/Home/HeroBusiness";
import SectionHeader from "@/components/common/SectionHeader";
import righticon from "../../../public/rlrr.webp";
import industrial from "../../../public/industrial.png";
import Commercial from "../../../public/commercial.png";
import Institutional from "../../../public/institutional.png";
import solorengineer from "../../../public/solorengineer.jpg";
import solorengineertwo from "../../../public/solorengineertwo.jpg";
import solorengineerthree from "../../../public/solorengineerthree.jpg";
import capexmodel from "../../../public/capexmodel.png";
import commissioning from "../../../public/concept-to-commissioning.jpg";
import commissioningmobile from "../../../public/concept-to-commissioning-mobile.jpg";
import engineerdesign from "../../../public/engineer-design.jpg";
import quete from "../../../public/quete.png";
import idealimage from "../../../public/idealimage.png";
import Manufacturing from "../../../public/ManufacturingUnits.png";
import production from "../../../public/Productionicon.png";
import CollegesUniversity from "../../../public/CollegesUniversity (1).png";
import HealthHospital from "../../../public/CollegesUniversity (2).png";
import BusinessParks from "../../../public/CollegesUniversity (3).png";
import officeComplex from "../../../public/CollegesUniversity (4).png";
import mallsHotels from "../../../public/CollegesUniversity (5).png";
import school from "../../../public/CollegesUniversity (6).png";
import coldStored from "../../../public/ColdStorage.png";
import capex from "../../../public/Capex.png";
import renewable from "../../../public/renewable-farms.png";
import KerlaBhavan from "../../../public/CMSKerlaBhavan.png";
import DayanandPublicSchool from "../../../public/DayanandPublicSchool.png";
import study from "../../../public/study.png";

const { Option } = Select;

export default function Page() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const options = [
    {
      label: "Home",
      value: "Home",
    },
    {
      label: "Commercial",
      value: "Commercial",
    },
    {
      label: "Business",
      value: "Business",
    },
  ];

  const caseStudies = [
    {
      id: 1,
      title: "Solar Mini Grid Ranchi",
      image: study,
    },
    {
      id: 2,
      title: "Solar Mini Grid Kolkata",
      image: study,
    },
    {
      id: 3,
      title: "Solar Mini Grid Ranchi",
      image: study,
    },
  ];

  return (
    <div>
      <HeroBusiness />

      {/* Why Choose Us Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            badge="Our Promise"
            title="Your Ideal Solar"
            highlight="Partner"
            description="Why choose us for your business solar solutions"
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white/50 backdrop-blur-sm p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Expertise</h3>
              <ul className="list-disc pl-6 space-y-4">
                <li>
                  We install solar PV systems on the roofs of Industries, Schools/Colleges/Universities, Hospitals/IT/ Business Parks/Mall /Shopping Complexes and Cold Storage.
                </li>
                <li>
                  We design for You! - By partnering with us, you'll get the smartest solar energy solution, customized to your specific needs.
                </li>
              </ul>
            </div>
            <div>
              <Image src={idealimage} alt="Leading Solar Solutions" className="w-full rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Business Solutions Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            badge="Our Solutions"
            title="Business Solar"
            highlight="Solutions"
            description="Our comprehensive solar solutions for different business types"
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300 bg-white/50 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 flex items-center justify-center">
                  <Image src={Manufacturing} alt="Manufacturing Icon" className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Industrial</h3>
              </div>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Manufacturing Units</li>
                <li>Production Units</li>
              </ul>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <Image src={BusinessParks} alt="Business Parks Icon" className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Commercial</h3>
              </div>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>IT/Business Parks</li>
                <li>Office Complexes</li>
                <li>Malls/Hotels</li>
              </ul>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <Image src={school} alt="School Icon" className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Institutional</h3>
              </div>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Schools</li>
                <li>Colleges/University</li>
                <li>Health Centers/Hospital</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>

      {/* Business Models Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            badge="Our Models"
            title="Flexible Business"
            highlight="Models"
            description="Choose the model that works best for your business needs"
            className="mb-12"
          />

          {/* CAPEX Model */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="bg-white/50 backdrop-blur-sm p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <Image
                    src={capex}
                    className="w-10 h-10 object-contain"
                    alt="CAPEX"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">CAPEX Model</h3>
                  <p className="text-blue-600 text-sm uppercase">Capital Expenditure</p>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600">
                  In this model, you make an upfront investment to own the solar power system. Perfect for businesses looking for maximum control and long-term savings.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                      <Image src={righticon} alt="Checkmark" className="w-3 h-3" />
                    </div>
                    <p className="text-gray-600">You own the solar power system</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                      <Image src={righticon} alt="Checkmark" className="w-3 h-3" />
                    </div>
                    <p className="text-gray-600">Enjoy all financial benefits</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                      <Image src={righticon} alt="Checkmark" className="w-3 h-3" />
                    </div>
                    <p className="text-gray-600">Complete control over the system</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                      <Image src={righticon} alt="Checkmark" className="w-3 h-3" />
                    </div>
                    <p className="text-gray-600">Higher long-term savings</p>
                  </div>
                </div>
              </div>
            </div>

            {/* OPEX Model */}
            <div className="bg-white/50 backdrop-blur-sm p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <Image
                    src={renewable}
                    className="w-10 h-10 object-contain"
                    alt="OPEX"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">OPEX Model</h3>
                  <p className="text-green-600 text-sm uppercase">Operating Expenditure</p>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600">
                  A hassle-free model where you pay only for the energy consumed. Perfect for businesses looking to reduce upfront costs and maintenance worries.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center mr-3">
                      <Image src={righticon} alt="Checkmark" className="w-3 h-3" />
                    </div>
                    <p className="text-gray-600">No upfront investment required</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center mr-3">
                      <Image src={righticon} alt="Checkmark" className="w-3 h-3" />
                    </div>
                    <p className="text-gray-600">Pay only for energy consumed</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center mr-3">
                      <Image src={righticon} alt="Checkmark" className="w-3 h-3" />
                    </div>
                    <p className="text-gray-600">No maintenance worries</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center mr-3">
                      <Image src={righticon} alt="Checkmark" className="w-3 h-3" />
                    </div>
                    <p className="text-gray-600">Flexible payment terms</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Section */}
          <div className="bg-white/50 backdrop-blur-sm p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Comparison</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/30 backdrop-blur-sm p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">CAPEX Model</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                      <Image src={righticon} alt="Checkmark" className="w-2 h-2" />
                    </div>
                    <span className="text-gray-600">Higher initial investment</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                      <Image src={righticon} alt="Checkmark" className="w-2 h-2" />
                    </div>
                    <span className="text-gray-600">Full ownership benefits</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                      <Image src={righticon} alt="Checkmark" className="w-2 h-2" />
                    </div>
                    <span className="text-gray-600">Higher long-term savings</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/30 backdrop-blur-sm p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">OPEX Model</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center mr-3">
                      <Image src={righticon} alt="Checkmark" className="w-2 h-2" />
                    </div>
                    <span className="text-gray-600">No upfront costs</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center mr-3">
                      <Image src={righticon} alt="Checkmark" className="w-2 h-2" />
                    </div>
                    <span className="text-gray-600">Pay-as-you-go model</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center mr-3">
                      <Image src={righticon} alt="Checkmark" className="w-2 h-2" />
                    </div>
                    <span className="text-gray-600">No maintenance worries</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Showcase Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            badge="Our Work"
            title="Featured Projects"
            highlight="Showcase"
            description="Explore our successful business solar installations"
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-xl">
              <Image
                src={solorengineer}
                alt="Manufacturing Plant Solar Installation"
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-xl font-bold mb-2">Manufacturing Plant</h3>
                  <p className="text-gray-200">1 MW Solar Installation</p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl">
              <Image
                src={solorengineertwo}
                alt="Shopping Mall Solar System"
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-xl font-bold mb-2">Shopping Mall</h3>
                  <p className="text-gray-200">500 kW Solar System</p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl">
              <Image
                src={solorengineerthree}
                alt="School Campus Solar Installation"
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-xl font-bold mb-2">School Campus</h3>
                  <p className="text-gray-200">250 kW Solar Installation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Studies Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            badge="Success Stories"
            title="Case"
            highlight="Studies"
            description="Explore our successful solar implementations and their impact"
            className="mb-12"
          />

          {/* Featured Case Study */}
          <div className="max-w-6xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg mb-16">
            <div className="p-8">
              <div className="flex flex-col lg:flex-row">
              <div className="lg:w-2/3 pr-0 lg:pr-8">
                <h2 className="text-2xl font-bold text-[#2D479E] mb-2">Solar Mini-Grid Electrification in Chatra, Jharkhand</h2>
                <p className="text-gray-500 mb-4 text-sm">Commissioned: March 2024 | Capacity: 25 kW (Scalable Design)</p>

                <div className="bg-blue-50 p-5 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold text-[#2D479E] mb-3">Project Overview</h3>
                  <p className="mb-4">A transformative solar mini-grid installation bringing reliable electricity to remote villages in Chatra District, Jharkhand, serving over 140 households, 20+ small businesses, a school, and a health sub-centre.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h4 className="font-semibold text-[#23bae4] mb-2">Technical Specifications</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Monocrystalline 540W x 48 panels (~26 kW)</li>
                        <li>30kW Hybrid Inverter (off-grid + grid-tied)</li>
                        <li>96 kWh Lithium-Ion Battery Bank</li>
                        <li>LT Line (Single-phase & 3-phase distribution)</li>
                        <li>Prepaid IoT meters with remote monitoring</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#23bae4] mb-2">Key Features</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>24/7 reliable power supply</li>
                        <li>Prepaid metering with mobile recharge model</li>
                        <li>AI-enabled demand prediction & load balancing</li>
                        <li>Designed for productive loads</li>
                        <li>Built-in capacity for expansion</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-[#2D479E] mb-3">Impact Highlights</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-[#23bae4]">90%</p>
                      <p className="text-sm">Increase in evening productivity</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-[#23bae4]">₹1,800</p>
                      <p className="text-sm">Average household monthly income increase</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-[#23bae4]">70%</p>
                      <p className="text-sm">Reduction in kerosene usage</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-[#23bae4]">0</p>
                      <p className="text-sm">Carbon emissions from energy source</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-[#2D479E] mb-3">Social & Economic Transformation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-[#23bae4] mb-2">Household Benefits</h4>
                      <p>Families now enjoy clean lighting, television access, fans, and mobile charging capabilities, significantly reducing kerosene dependency and improving quality of life.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#23bae4] mb-2">Business Growth</h4>
                      <p>Local shops, tailors, and flour mills now operate extended hours, boosting income and creating new economic opportunities within the community.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#23bae4] mb-2">Education Impact</h4>
                      <p>The local school now benefits from lighting, fans, and digital learning setups, enhancing the learning environment for students.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#23bae4] mb-2">Healthcare Improvements</h4>
                      <p>The rural health centre now has refrigeration for vaccines and night lighting, enabling better healthcare services for the community.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/3 mt-6 lg:mt-0">
                <div className="bg-gray-50 p-5 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold text-[#2D479E] mb-3">Challenges & Solutions</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold">Difficult terrain for equipment transport</p>
                      <p className="text-sm text-gray-600">Used modular mounting + local labor</p>
                    </div>
                    <div>
                      <p className="font-semibold">Load variability during agricultural seasons</p>
                      <p className="text-sm text-gray-600">Integrated AI-based load forecasting</p>
                    </div>
                    <div>
                      <p className="font-semibold">Bill collection in cash-only economy</p>
                      <p className="text-sm text-gray-600">Introduced mobile recharge-based prepaid token system</p>
                    </div>
                    <div>
                      <p className="font-semibold">Lack of skilled manpower</p>
                      <p className="text-sm text-gray-600">Trained local youth as microgrid technicians</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold text-[#2D479E] mb-3">Partners & Support</h3>
                  <ul className="space-y-2">
                    <li><span className="font-semibold">Funding:</span> CSR-backed + Partial Community Contribution</li>
                    <li><span className="font-semibold">Support:</span> Local Panchayats, Jharkhand Renewable Energy Development Agency (JREDA)</li>
                    <li><span className="font-semibold">O&M:</span> Sologix O&M Team with local technician training</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-xl font-semibold text-[#2D479E] mb-3">Future Roadmap</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Solar cold storage and water pumping stations</li>
                    <li>Community EV charging infrastructure</li>
                    <li>Micro-financing for household appliances</li>
                    <li>Scale to 15+ villages in Jharkhand and Bihar</li>
                  </ul>
                </div>

                <div className="mt-6">
                  <Button className="bg-[#324CA2] border text-white w-full py-2 h-auto">Request Similar Solution</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-blue-50">
            <p className="italic text-center">"This mini-grid in Chatra is a flagship project of Sologix Energy, demonstrating how clean, decentralized solar power can transform rural lives. It's not just about electricity — it's about opportunity, dignity, and future-readiness."</p>
          </div>
        </div>

          {/* Other Case Studies - Preview Cards */}
          <h2 className="text-2xl font-bold text-[#2D479E] mb-6 text-center">More Success Stories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {caseStudies.slice(0, 3).map((study) => (
              <div key={study.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <Image src={study.image} alt={study.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-0 right-0 bg-[#23bae4] text-white px-2 py-1 text-xs">Case Study</div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2">{study.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">Solar mini-grid implementation providing sustainable energy solutions to rural communities.</p>
                  <div className="flex justify-end">
                    <Button className="bg-[#324CA2] border text-white hover:bg-[#213890] transition-colors">View Details</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
