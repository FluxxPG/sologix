"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./about.css";
import electroniccar from "../../../public/isolated-vector-illustration-electric-car-260nw-2210905809 1.png";
import handshake from "../../../public/handshake.png";
import site from "../../../public/site-1.png";
import system from "../../../public/system-design.png";
import procurement from "../../../public/Procurement.png";
import installation from "../../../public/installation.png";
import operation from "../../../public/operation.png";
import amitRanjanImg from "../../../public/AmitRanjan.jpg";
import heroImage from "../../../public/aboutus.jpg";
import { API } from "@/utils";

const SectionHeader = ({ 
  badge, 
  title, 
  highlight, 
  description, 
  className = '',
  titleClassName = 'text-gray-900',
  highlightClassName = 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500',
  descriptionClassName = 'text-gray-600',
  badgeVariant = 'default' // 'default' or 'light'
}) => {
  return (
    <div className={`text-center max-w-3xl mx-auto mb-12 ${className}`}>
      {badge && (
        <div className={`inline-flex items-center justify-center px-6 py-2 rounded-full mb-4 ${
          badgeVariant === 'light' 
            ? 'bg-white/20 border border-white/30' 
            : 'bg-blue-50 border border-blue-100'
        }`}>
          <span className="flex h-2 w-2 mr-2 relative">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
              badgeVariant === 'light' ? 'bg-white/50' : 'bg-blue-400/75'
            }`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${
              badgeVariant === 'light' ? 'bg-white' : 'bg-blue-600'
            }`}></span>
          </span>
          <span className={`text-sm font-medium ${
            badgeVariant === 'light' ? 'text-white' : 'text-blue-800'
          }`}>
            {badge}
          </span>
        </div>
      )}
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${titleClassName}`}>
        {title} {highlight && <span className={highlightClassName}>{highlight}</span>}
      </h2>
      <div className={`w-20 h-1 mx-auto mb-6 rounded-full ${
        badgeVariant === 'light' 
          ? 'bg-white' 
          : 'bg-gradient-to-r from-blue-500 to-cyan-500'
      }`}></div>
      {description && <p className={`text-lg ${descriptionClassName}`}>{description}</p>}
    </div>
  );
};

const AboutUs = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ['Solar Energy', 'Green Future', 'Clean Power', 'Sustainability'];
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [words.length]);

  useEffect(() => {
    const getAllFeedbacks = async () => {
      // Only run on client side
      if (typeof window === 'undefined') return;
      
      try {
        setLoading(true);
        setError(null);
        
        const userSession = localStorage.getItem("userSession");
        const parsedSession = userSession ? JSON.parse(userSession) : null;
        const accessToken = parsedSession?.access_token;

        if (!accessToken) {
          // Only log in development
          if (process.env.NODE_ENV === 'development') {
            console.log("User not authenticated - feedback fetch skipped");
          }
          setFeedbacks([]);
          return;
        }

        const response = await API.get("/feedbacks/fetch-All-Feedbacks", {
          headers: {
            "authorization": `token ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        
        if (response.data?.data) {
          setFeedbacks(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
        setError("Failed to load feedbacks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getAllFeedbacks();
  }, []);
  
  const handleContactUs = () => {
    router.push("/contactus");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full">
      {/* Hero Section with HD Background */}
      <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900/90 to-blue-700/90">
        <div className="absolute inset-0 w-full h-full z-0">
          <Image 
            src={heroImage}
            alt="Solar energy solutions"
            fill
            className="object-cover"
            priority
            quality={100}
            placeholder="blur"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 z-10 py-12 md:py-20 relative">
          <div className="flex flex-col items-center text-center w-full max-w-4xl mx-auto px-2 sm:px-4">
            <div className="mb-6">
              <span className="inline-block px-6 py-2.5 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white text-sm font-medium shadow-lg shadow-blue-500/10">
                Our Story
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-[1.3] text-white w-full">
              <div className="inline-block pt-1 pb-2">
                <div className="-mt-2">Powering a Sustainable Future With</div>
                <span className={`block md:inline-block mt-2 md:mt-0 pt-1 pb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 transition-all duration-500 ease-in-out ${
                  isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}>
                  {words[currentWordIndex]}
                </span>
              </div>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-white/90 -mt-2 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed w-full px-2 sm:px-4">
              Pioneering the clean energy revolution with innovative solar solutions that make a difference for generations to come.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <SectionHeader 
          badge="Our Mission"
          title="Our "
          highlight="Mission"
          description="Committed to providing clean, sustainable energy solutions for a better future"
          className="text-center"
        />
        
        <div className="flex flex-col md:flex-row items-center gap-12 mt-8">
          <div className="w-full md:w-1/2">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              <Image 
                src={electroniccar} 
                alt="Clean Energy Solutions"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white text-lg font-medium">Clean Energy for a Sustainable Future</p>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="space-y-4 text-gray-700">
              <p className="text-lg leading-relaxed">
                With the increasing GHG emissions and Global Warming threat, our team of experts from IIT, NIT, and DTU recognized the urgent need to counter the adverse impacts of climate change and limit the Earth's rising temperature.
              </p>
              <p className="text-lg leading-relaxed">
                We are on a mission to make this planet a better place to live, committed to providing clean energy that is <span className="font-semibold text-blue-600">Renewable, Reliable, and Affordable</span> for all.
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { value: '10+', label: 'Years Experience' },
                { value: '100%', label: 'Customer Satisfaction' },
                { value: '24/7', label: 'Support' },
                { value: 'Eco', label: 'Friendly' }
              ].map((stat, index) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            badge="Our Values"
            title="Our "
            highlight="Core Values"
            description="Guiding principles that define who we are and how we work"
            className="text-center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Innovation',
                description: 'Constantly pushing boundaries to develop cutting-edge solar solutions',
                icon: '💡'
              },
              {
                title: 'Sustainability',
                description: 'Committed to environmental responsibility in all our operations',
                icon: '🌱'
              },
              {
                title: 'Excellence',
                description: 'Delivering superior quality and performance in everything we do',
                icon: '⭐'
              },
              {
                title: 'Integrity',
                description: 'Building trust through transparency and ethical practices',
                icon: '🤝'
              }
            ].map((value, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            badge="Our Team"
            title="Meet Our "
            highlight="Leadership"
            description="The brilliant minds behind our mission to revolutionize clean energy"
            className="text-center"
          />

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-2xl mx-auto">
            {[
              {
                name: 'Amit Ranjan',
                role: 'Co-Founder & CEO',
                image: amitRanjanImg,
                bio: 'Visionary leader with 15+ years of experience in renewable energy and sustainable technologies.'
              }
            ].map((member, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 max-w-xs mx-auto w-full"
              >
                <div className="relative aspect-[3/4] w-48 mx-auto">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 45vw, 200px"
                    priority
                    quality={100}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>



      <div className="p-8 md:p-12 bg-gradient-to-r">
        <h1 className="text-center font-bold text-3xl mb-4 text-white">
          How it Works - Process
        </h1>
        <div className="mt-5">
          <ul className="list-disc leading-7 mb-3">
            <li>
              We provide design, engineering, procurement and installation
              services for solar PV systems to residential, institutional,
              industrial, and commercial consumers in both CAPEX and OPEX/RESCO
              models.
            </li>
          </ul>
          <ul className="list-disc leading-7 mb-3">
            <li>
              We not only integrate the system, but also care for it with the
              endeavor to give you the fastest possible break-even on your
              investment.
            </li>
          </ul>
          <ul className="list-disc leading-7 mb-3">
            <li>
              We help large corporate and bulk power consumers to source green
              power (Solar/Wind/Hybrid PPA) through Open Access power
              procurement mechanism.
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <div className="flex items-center flex-col justify-center text-center gap-2">
            <Image
              src={site}
              className="w-8 md:w-20 lg:w-14"
              alt="Site Survey"
            />
            <div className="flex items-center justify-center gap-2">
              <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">01</h1>
              <span className="text-sm md:text-base font-medium">
                Site Survey <br /> and Analysis
              </span>
            </div>
          </div>
          <div className="flex items-center flex-col justify-center text-center gap-2">
            <Image
              src={handshake}
              className="w-14 md:w-20 lg:w-24"
              alt="Proposal and Agreement"
            />
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">02</h1>
              <span className="text-sm md:text-base font-medium">
                Proposal and <br /> Agreement
              </span>
            </div>
          </div>
          <div className="flex items-center flex-col justify-center text-center gap-3 flex-wrap">
            <Image
              src={system}
              className="w-10 md:w-20 lg:w-[85px]"
              alt="System Design and Engineering"
            />
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">03</h1>
              <span className="text-sm md:text-base font-medium">
                System Design <br /> and Engineering
              </span>
            </div>
          </div>
          <div className="flex items-center flex-col justify-center text-center gap-3">
            <Image
              src={procurement}
              className="w-10 md:w-20 lg:w-24"
              alt="Procurement and Construction"
            />
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">04</h1>
              <span className="text-sm md:text-base font-medium">
                Procurement and <br /> Construction
              </span>
            </div>
          </div>
          <div className="flex items-center flex-col justify-center text-center gap-3">
            <Image
              src={installation}
              className="w-14 md:w-20 lg:w-24 "
              alt="Installation and Commissioning"
            />
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">05</h1>
              <span className="text-sm md:text-base font-medium">
                Installation and <br /> Commissioning
              </span>
            </div>
          </div>
          <div className="flex items-center flex-col justify-center text-center gap-3">
            <Image
              src={operation}
              className="w-10 md:w-20 lg:w-[65px]"
              alt="Operations and Maintenance"
            />
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">06</h1>
              <span className="text-sm md:text-base font-medium">
                Operations and <br /> Maintenance
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            badge="Testimonials"
            title="What Our "
            highlight="Clients Say"
            description="Hear from our satisfied customers about their experience with Sologix Energy"
            className="text-center"
          />

          <div className="mt-12">
            <Slider 
              dots={true}
              infinite={true}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              autoplay={true}
              autoplaySpeed={5000}
              pauseOnHover={true}
              arrows={false}
              className="testimonial-slider"
            >
              {/* Testimonial 1 */}
              <div className="px-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-shrink-0 relative">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-100 relative">
                        <Image 
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces" 
                          alt="Mr. Rajesh Kumar" 
                          width={160}
                          height={160}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-center md:text-left">
                      <div className="flex justify-center md:justify-start gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-700 text-lg italic mb-6 relative">
                        <span className="absolute -top-4 -left-2 text-5xl text-gray-200 font-serif">"</span>
                        Sologix Energy transformed our home with their solar solution. We've seen a 70% reduction in our electricity bills, and the installation was completed ahead of schedule. Their team was professional and knowledgeable throughout the entire process.
                        <span className="absolute -bottom-6 -right-2 text-5xl text-gray-200 font-serif">"</span>
                      </p>
                      <div className="mt-8">
                        <h4 className="text-xl font-bold text-gray-900">Mr. Rajesh Kumar</h4>
                        <p className="text-blue-600">Residential Solar System Owner, Noida</p>
                        <div className="mt-2 text-sm text-gray-500">
                          <span className="font-medium">Project:</span> 5kW Rooftop Solar System
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="px-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-shrink-0 relative">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-100 relative">
                        <Image 
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces" 
                          alt="Ms. Priya Sharma" 
                          width={160}
                          height={160}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-center md:text-left">
                      <div className="flex justify-center md:justify-start gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-700 text-lg italic mb-6 relative">
                        <span className="absolute -top-4 -left-2 text-5xl text-gray-200 font-serif">"</span>
                        As a business owner, I was looking for ways to reduce operational costs. Sologix's commercial solar solution was a game-changer for us. The system has significantly lowered our electricity expenses, and their maintenance team is always prompt and efficient.
                        <span className="absolute -bottom-6 -right-2 text-5xl text-gray-200 font-serif">"</span>
                      </p>
                      <div className="mt-8">
                        <h4 className="text-xl font-bold text-gray-900">Ms. Priya Sharma</h4>
                        <p className="text-blue-600">Business Owner, Gurugram</p>
                        <div className="mt-2 text-sm text-gray-500">
                          <span className="font-medium">Project:</span> 50kW Commercial Solar Installation
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="px-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-shrink-0 relative">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-100 relative">
                        <Image 
                          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces" 
                          alt="Dr. Amit Patel" 
                          width={160}
                          height={160}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-center md:text-left">
                      <div className="flex justify-center md:justify-start gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-700 text-lg italic mb-6 relative">
                        <span className="absolute -top-4 -left-2 text-5xl text-gray-200 font-serif">"</span>
                        The hybrid solar system installed by Sologix has been working flawlessly. Even during power cuts, we have uninterrupted power supply. Their team provided excellent guidance on the right system size and the return on investment has been better than expected.
                        <span className="absolute -bottom-6 -right-2 text-5xl text-gray-200 font-serif">"</span>
                      </p>
                      <div className="mt-8">
                        <h4 className="text-xl font-bold text-gray-900">Dr. Amit Patel</h4>
                        <p className="text-blue-600">Hospital Administrator, Delhi</p>
                        <div className="mt-2 text-sm text-gray-500">
                          <span className="font-medium">Project:</span> 30kW Hybrid Solar System with Battery Backup
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 4 */}
              <div className="px-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-shrink-0 relative">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-100 relative">
                        <Image 
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces" 
                          alt="Mr. Vikram Mehta" 
                          width={160}
                          height={160}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-center md:text-left">
                      <div className="flex justify-center md:justify-start gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-700 text-lg italic mb-6 relative">
                        <span className="absolute -top-4 -left-2 text-5xl text-gray-200 font-serif">"</span>
                        We chose Sologix for our factory's solar needs, and it's been one of our best decisions. The 200kW system powers our entire manufacturing unit, and we've seen a 40% reduction in our electricity costs. The installation was completed with minimal disruption to our operations.
                        <span className="absolute -bottom-6 -right-2 text-5xl text-gray-200 font-serif">"</span>
                      </p>
                      <div className="mt-8">
                        <h4 className="text-xl font-bold text-gray-900">Mr. Vikram Mehta</h4>
                        <p className="text-blue-600">Factory Owner, Faridabad</p>
                        <div className="mt-2 text-sm text-gray-500">
                          <span className="font-medium">Project:</span> 200kW Industrial Solar Plant
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 5 */}
              <div className="px-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-shrink-0 relative">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-100 relative">
                        <Image 
                          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces" 
                          alt="Mrs. Anjali Desai" 
                          width={160}
                          height={160}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-center md:text-left">
                      <div className="flex justify-center md:justify-start gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-700 text-lg italic mb-6 relative">
                        <span className="absolute -top-4 -left-2 text-5xl text-gray-200 font-serif">"</span>
                        Our school's electricity bills were becoming unsustainable until we switched to solar with Sologix. The 30kW system now powers our entire campus, and we're using the savings to improve our facilities. The educational program they provided also helped our students learn about renewable energy.
                        <span className="absolute -bottom-6 -right-2 text-5xl text-gray-200 font-serif">"</span>
                      </p>
                      <div className="mt-8">
                        <h4 className="text-xl font-bold text-gray-900">Mrs. Anjali Desai</h4>
                        <p className="text-blue-600">School Principal, Ghaziabad</p>
                        <div className="mt-2 text-sm text-gray-500">
                          <span className="font-medium">Project:</span> 30kW Educational Institution Solar Project
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 6 */}
              <div className="px-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-shrink-0 relative">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-100 relative">
                        <Image 
                          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces" 
                          alt="Mr. Rakesh Malhotra" 
                          width={160}
                          height={160}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-center md:text-left">
                      <div className="flex justify-center md:justify-start gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-700 text-lg italic mb-6 relative">
                        <span className="absolute -top-4 -left-2 text-5xl text-gray-200 font-serif">"</span>
                        The solar carport system Sologix installed in our apartment complex has been fantastic. Not only are we saving on electricity costs, but the covered parking is a huge plus for residents. The maintenance has been minimal, and the system performs better than promised.
                        <span className="absolute -bottom-6 -right-2 text-5xl text-gray-200 font-serif">"</span>
                      </p>
                      <div className="mt-8">
                        <h4 className="text-xl font-bold text-gray-900">Mr. Rakesh Malhotra</h4>
                        <p className="text-blue-600">Residents' Welfare Association President, Noida</p>
                        <div className="mt-2 text-sm text-gray-500">
                          <span className="font-medium">Project:</span> 100kW Solar Carport for Apartment Complex
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
