"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Form, Input, Checkbox, Button } from "antd";
import { toast } from "sonner";
import { API } from "@/utils";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import SectionHeader from "@/components/common/SectionHeader";

const contactInfo = [
  {
    icon: <FaPhoneAlt className="text-3xl text-blue-600" />,
    title: "Phone",
    description: "+91-8287766474",
    link: "tel:+918287766474"
  },
  {
    icon: <FaEnvelope className="text-3xl text-blue-600" />,
    title: "Email",
    description: "info@sologixenergy.in",
    link: "mailto:info@sologixenergy.in"
  },
  {
    icon: <FaMapMarkerAlt className="text-3xl text-blue-600" />,
    title: "Location",
    description: "STPI Building, Plot -8, Namkum Industrial Area, Ranchi, Jharkhand - 834010",
    link: "https://www.google.com/maps/search/?api=1&query=STPI+Building,+Plot+-8,+Namkum+Industrial+Area,+Ranchi,+Jharkhand+-+834010"
  }
];

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    city: "",
    message: "",
    interest: [],
  });

  const handleCheckboxChange = (checkedValues) => {
    setFormData((prev) => ({
      ...prev,
      interest: checkedValues,
    }));
  };

  const handleSubmit = () => {
    console.log("Submitting form data:", formData);
    API.post("/auth/contact-us", formData)
      .then((response) => {
        if (response.status === 200) {
          toast("Successfully submitted");
          setFormData({
            name: "",
            email: "",
            phone: "",
            state: "",
            city: "",
            city: "",
            pincode: "",
            message: "",
            interest: [],
          });
        } else {
          toast.error(response?.data?.error || "Submission failed");
        }
      })
      .catch((error) => {
        console.error("API error:", error);
        toast.error("Data submission failed");
      });
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900/90 to-blue-700/90">
        <div className="absolute inset-0 w-full h-full z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80)',
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
                Get In Touch
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-[1.3] text-white w-full">
              <div className="inline-block pt-1 pb-2">
                <div className="-mt-2">Contact Us</div>
                <span className="block md:inline-block mt-2 md:mt-0 pt-1 pb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  Let's Connect
                </span>
              </div>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-white/90 -mt-2 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed w-full px-2 sm:px-4">
              Have questions about our solar solutions? Reach out to our team for expert advice and support.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            badge="Get In Touch"
            title="Contact"
            highlight="Us"
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {contactInfo.map((item, index) => (
              <a 
                key={index} 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center"
              >
                <div className="bg-blue-50 p-4 rounded-full mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Send Us a Message
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fill out the form below and our team will get back to you as soon as possible.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <Form layout="vertical" onFinish={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item 
                  label="Your Name" 
                  name="name" 
                  rules={[{ required: true, message: 'Please enter your name' }]}
                  className="mb-0"
                >
                  <Input
                    size="large"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    autoComplete="name"
                  />
                </Form.Item>

                <Form.Item 
                  label="Email Address" 
                  name="email" 
                  rules={[{ 
                    required: true, 
                    type: 'email',
                    message: 'Please enter a valid email' 
                  }]}
                  className="mb-0"
                >
                  <Input
                    type="email"
                    size="large"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    autoComplete="email"
                  />
                </Form.Item>

                <Form.Item 
                  label="Phone Number" 
                  name="phone" 
                  rules={[{ 
                    required: true, 
                    message: 'Please enter your phone number' 
                  }]}
                  className="mb-0"
                >
                  <Input
                    size="large"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    autoComplete="tel"
                  />
                </Form.Item>

                <Form.Item 
                  label="City" 
                  name="city"
                  className="mb-0"
                >
                  <Input
                    size="large"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    autoComplete="address-level2"
                  />
                </Form.Item>

                <Form.Item 
                  label="State" 
                  name="state"
                  className="mb-0"
                >
                  <Input
                    size="large"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your State"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    autoComplete="address-level1"
                  />
                </Form.Item>

                <Form.Item 
                  label="Pin Code" 
                  name="pincode"
                  className="mb-0"
                >
                  <Input
                    size="large"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="123456"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    autoComplete="postal-code"
                  />
                </Form.Item>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">What are you interested in?</h3>
                <Form.Item name="interest" className="mb-0">
                  <Checkbox.Group
                    value={formData.interest}
                    onChange={handleCheckboxChange}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  >
                    {['Home', 'Commercial', 'Business', 'Institution'].map((item) => {
                      const id = `interest-${item.toLowerCase()}`;
                      return (
                        <Checkbox 
                          key={item} 
                          id={id}
                          name="interest"
                          value={item}
                          className="rounded-lg border-gray-300 hover:border-blue-500"
                        >
                          <label htmlFor={id} className="cursor-pointer">
                            {item}
                          </label>
                        </Checkbox>
                      );
                    })}
                  </Checkbox.Group>
                </Form.Item>
              </div>

              <Form.Item 
                name="message" 
                label="Your Message"
                className="mt-6"
              >
                <Input.TextArea
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  autoComplete="off"
                />
              </Form.Item>

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-4 px-6 rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"></path>
                  </svg>
                  <span>Send Message</span>
                </button>
                <p className="mt-3 text-sm text-gray-500 text-center">
                  We'll get back to you within 24 hours
                </p>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
