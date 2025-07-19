"use client";
import Image from "next/image";
import React from "react";
import { FaTwitter, FaInstagram, FaLinkedin, FaFacebookF, FaYoutube } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';
import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <FaFacebookF className="text-lg" />, url: "#" },
    { icon: <FaTwitter className="text-lg" />, url: "#" },
    { icon: <FaInstagram className="text-lg" />, url: "#" },
    { icon: <FaLinkedin className="text-lg" />, url: "#" },
    { icon: <FaYoutube className="text-lg" />, url: "#" },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/aboutus" },
    { name: "For Home", path: "/forhome" },
    { name: "For Business", path: "/solorbusiness" },
    { name: "Become a Partner", path: "/becomepartner" },
    { name: "Resources", path: "/resource" },
    { name: "Contact Us", path: "/contactus" },
  ];

  const legalLinks = [
    { name: "Terms & Conditions", path: "/termCondition" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Return Policy", path: "/refund" },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#00237D] to-[#001a5a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-1 bg-blue-400 rounded-full"></div>
              <h3 className="text-xl font-bold">About Company</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              We are on a mission to make this planet a better place to live and we are committed to making clean energy available to all - Renewable, Reliable, and Affordable.
            </p>
            <div className="flex space-x-4 pt-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-blue-500 transition-all duration-300"
                  aria-label={social.icon.type.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          {/* Quick Links */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-1 bg-blue-400 rounded-full"></div>
              <h3 className="text-xl font-bold">Quick Links</h3>
            </div>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-1 bg-blue-400 rounded-full"></div>
              <h3 className="text-xl font-bold">Legal</h3>
            </div>
            <ul className="space-y-2">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
      {/* <div className="flex-1 mb-6 md:mb-0">
        <h3 className="text-lg font-bold mb-2">Follow Us</h3>
        <div className="flex space-x-4">
          <a href="#">
            <Image src={twitter} alt="Twitter" className="w-8" />
          </a>
          <a href="#">
            <Image src={snapchat} alt="Snapchat" className="w-8" />
          </a>
          <a href="#">
            <Image src={insta} alt="Instagram" className="w-8" />
          </a>
        </div>
      </div> */}
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-10 w-1 bg-blue-400 rounded-full"></div>
                <h3 className="text-xl font-bold">Contact Us</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    <FiMapPin className="text-blue-400 text-xl" />
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=STPI+Building,+Plot+-8,+Namkum+Industrial+Area,+Ranchi,+Jharkhand+-+834010"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    STPI Building, Plot -8, Namkum Industrial Area,<br />Ranchi, Jharkhand - 834010
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <FiMail className="text-blue-400 text-xl" />
                  <div className="flex flex-col space-y-1">
                    <a
                      href="mailto:info@sologixenergy.in"
                      className="text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      info@sologixenergy.in
                    </a>
                    <a
                      href="mailto:amit@sologixenergy.in"
                      className="text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      amit@sologixenergy.in
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <FiPhone className="text-blue-400 text-xl" />
                  <a href="tel:+918287766474" className="text-gray-300 hover:text-white transition-colors duration-300">
                    +91-8287766474
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <FiClock className="text-blue-400 text-xl" />
                  <p className="text-gray-300">Mon - Sat: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <p className="text-gray-400 text-sm text-center">
              © {currentYear} Sologix Energy. All rights reserved. | Developed by{' '}
              <a 
                href="https://www.warpvision.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-bold text-white hover:text-blue-300 transition-colors"
              >
                Warp Vision
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};


