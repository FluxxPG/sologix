"use client"
import Image from 'next/image'
import React from 'react'
import GreenEnergy from '../../../public/A.png'
import Government from '../../../public/government 2.png'
import Reduce from '../../../public/Group 8.png'
import Secure from '../../../public/Vector (2).png'
import LowMaintenance from '../../../public/Vector (4).png'
import save from '../../../public/Group (3).png'
import { useRouter } from 'next/navigation'
import SectionHeader from '../common/SectionHeader'

const benefits = [
  {
    icon: GreenEnergy,
    title: 'Green Energy',
    description: 'Solar is a renewable source of energy available everywhere. No greenhouse gas emissions means a cleaner, healthier planet for future generations.'
  },
  {
    icon: Government,
    title: 'Government Support',
    description: 'With 40% government subsidy, solar PV systems are more affordable than ever. Take advantage of financial incentives and rebates available for clean energy adoption.'
  },
  {
    icon: Reduce,
    title: 'Reduce Power Bill',
    description: 'Dramatically cut your electricity costs by up to 90% with our efficient solar PV systems. Generate your own power and gain energy independence.'
  },
  {
    icon: Secure,
    title: 'Secure Investment',
    description: 'Achieve ROI in just 3-4 years, then enjoy decades of virtually free electricity. Solar panels typically last 25+ years with minimal performance degradation.'
  },
  {
    icon: LowMaintenance,
    title: 'Low Maintenance',
    description: 'Our solar systems are designed for durability with no moving parts. We offer comprehensive maintenance packages to ensure optimal performance year after year.'
  },
  {
    icon: save,
    title: 'Save The Planet',
    description: 'Each solar installation helps reduce carbon emissions. Join the movement towards sustainable energy and make a positive impact on climate change.'
  }
];
 
export const WhySolar = () => {
  const router = useRouter();
  
  const handleBookCall = () => {
    router.push("/contactus");
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          badge="Benefits"
          title="Why Choose"
          highlight="Solar Energy?"
          description="Discover the compelling reasons to make the switch to clean, renewable solar energy today."
          className="mb-16"
        />

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-100 transition-colors duration-300">
                <div className="relative w-8 h-8">
                  <Image 
                    src={benefit.icon} 
                    alt={benefit.title}
                    fill
                    className="object-contain text-blue-600"
                    sizes="32px"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-center">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Ready to Start Your Solar Journey?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Schedule a free consultation with our solar experts to explore the best solutions for your energy needs.
          </p>
          <button 
            onClick={handleBookCall}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Book a Free Consultation
          </button>
        </div>
      </div>
    </section>
  )
}
