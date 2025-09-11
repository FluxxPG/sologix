"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Checkbox } from "antd";
import { toast } from "sonner";
import { PartnerHero } from "@/components/Home/PartnerHero";
import SectionHeader from "@/components/common/SectionHeader";

// Icons
import { FaUserTie, FaHandshake, FaCogs, FaChartLine } from 'react-icons/fa';
import { BsLightningChargeFill } from 'react-icons/bs';

const benefits = [
  {
    icon: <FaUserTie className="text-4xl text-blue-500 mb-4" />,
    title: "Established Network",
    description: "Join our network of 100+ satisfied customers across Northern and Eastern India.",
    bg: "bg-blue-50"
  },
  {
    icon: <FaHandshake className="text-4xl text-green-500 mb-4" />,
    title: "Collaborative Approach",
    description: "Work with us to create leads and generate online quotations instantly.",
    bg: "bg-green-50"
  },
  {
    icon: <FaCogs className="text-4xl text-amber-500 mb-4" />,
    title: "Comprehensive Training",
    description: "Get trained and start your solar business journey with our expert guidance.",
    bg: "bg-amber-50"
  },
  {
    icon: <FaChartLine className="text-4xl text-purple-500 mb-4" />,
    title: "Growth Opportunities",
    description: "No technical background needed - we provide end-to-end support for all partners.",
    bg: "bg-purple-50"
  }
];

const BecomePartner = () => {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    pincode: "",
    message: "",
    interest: [],
  });

  // Show success banner after redirect
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("success") === "true") {
      setShowSuccess(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleCheckboxChange = (checkedValues) => {
    setFormData((prev) => ({
      ...prev,
      interest: checkedValues,
    }));
  };

  const handleSubmit = (values) => {
    // Normalize from AntD values to ensure consistency
    const cleanedData = {
      name: (values.name || formData.name || "").trim(),
      email: (values.email || formData.email || "").trim(),
      phone: (values.phone || formData.phone || "").trim(),
      state: (values.state || formData.state || "").trim(),
      city: (values.city || formData.city || "").trim(),
      pincode: (values.pincode || formData.pincode || "").trim(),
      message: (values.message || formData.message || "").trim(),
      interest: values.interest || formData.interest || [],
    };

    if (!cleanedData.name || !cleanedData.email || !cleanedData.phone) {
      toast.error("Please fill in name, email and phone");
      return;
    }

    setLoading(true);

    const payload = new FormData();
    payload.append("name", cleanedData.name);
    payload.append("email", cleanedData.email);
    payload.append("phone", cleanedData.phone);
    payload.append("state", cleanedData.state);
    payload.append("city", cleanedData.city);
    payload.append("pincode", cleanedData.pincode);
    payload.append("message", cleanedData.message);
    payload.append("interest", (cleanedData.interest || []).join(", "));
    // Helpful metadata for email
    payload.append("form_name", "Become a Partner Form");
    payload.append("submitted_at", new Date().toISOString());
    payload.append("page_url", window.location.href);

    // FormSubmit config
    payload.append("_subject", `[SologixEnergy] Partner Application - ${cleanedData.name}`);
    payload.append("_replyto", cleanedData.email);
    payload.append("_next", window.location.origin + "/becomepartner?success=true");
    payload.append(
      "_autoresponse",
      "Thank you for your partner application to SologixEnergy! Our team will get back to you within 24 hours."
    );
    payload.append("_template", "table");
    payload.append("_cc", "info@sologixenergy.com");

    // Use FormSubmit AJAX endpoint for consistent delivery and disable CAPTCHA
    payload.append("_captcha", "false");
    fetch("https://formsubmit.co/ajax/sologixenergy7@gmail.com", {
      method: "POST",
      body: payload,
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          toast.success("✅ Application submitted successfully!");
          setFormData({
            name: "",
            email: "",
            phone: "",
            state: "",
            city: "",
            pincode: "",
            message: "",
            interest: [],
          });
          setTimeout(() => {
            window.location.href = "/becomepartner?success=true";
          }, 1200);
        } else {
          throw new Error("Form submission failed");
        }
      })
      .catch((error) => {
        console.error("FormSubmit error:", error);
        toast.error("Failed to submit. Please try again later.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="bg-white">
      <PartnerHero />

      {/* Benefits Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            badge="Why Partner With Us"
            title="Grow Your Business"
            highlight="With Solar"
            description="Join India's leading solar energy network and unlock new business opportunities"
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className={`${benefit.bg} rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300`}
              >
                <div className="flex justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div id="partnerForm" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Become a"
            highlight="Partner Today"
            description="Fill out the form below and our team will get back to you within 24 hours."
            className="mb-12 text-center"
          />

          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            {/* Success banner */}
            {showSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <div>
                    <p className="text-green-800 font-medium">Application sent successfully!</p>
                    <p className="text-green-700 text-sm">We will contact you within 24 hours.</p>
                  </div>
                </div>
              </div>
            )}

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
                  label="Pincode" 
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
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Areas of Interest
                </h3>
                <Form.Item name="interest" className="mb-0">
                  <Checkbox.Group
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    value={formData.interest}
                    onChange={handleCheckboxChange}
                  >
                    {['Residential', 'Commercial', 'Industrial', 'Institutional'].map((type) => (
                      <div key={type} className="flex items-center space-x-3">
                        <Checkbox 
                          id={`interest-${type.toLowerCase()}`}
                          name="interest"
                          value={type}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        >
                          <label htmlFor={`interest-${type.toLowerCase()}`} className="text-gray-700 cursor-pointer">
                            {type}
                          </label>
                        </Checkbox>
                      </div>
                    ))}
                  </Checkbox.Group>
                </Form.Item>
              </div>

              <Form.Item 
                label="Tell us about your business" 
                name="message" 
                className="mt-6"
              >
                <Input.TextArea
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Briefly describe your business and why you're interested in partnering with us..."
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
                  <BsLightningChargeFill className="text-xl" />
                  <span>Submit Application</span>
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

export default BecomePartner;
