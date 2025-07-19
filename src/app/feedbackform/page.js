"use client";
import React, { useState } from "react";
import axios from "axios";

export default function AddFeedbackForm() {
  const [formData, setFormData] = useState({
    clientName: "",
    designation: "",
    company: "",
    comment: "",
    systemCapacity: "",
    systemType: "",
    location: "",
    annual_energy_generation: "",
    annual_savings: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userSession = localStorage.getItem("userSession");
      const parsedSession = userSession ? JSON.parse(userSession) : null;
      const accessToken = parsedSession?.access_token;

      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const response = await axios.post(
        "https://sologix-web.onrender.com/v1/feedbacks/postfeedback",
        {
          clientName: formData.clientName,
          designation: formData.designation,
          company: formData.company,
          comment: formData.comment,
          systemCapacity: Number(formData.systemCapacity),
          systemType: formData.systemType,
          location: formData.location,
          annual_energy_generation: Number(formData.annual_energy_generation),
          annual_savings: Number(formData.annual_savings),
        },
        {
          headers: {
            Authorization: `token ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setMessage("✅ Feedback added successfully!");
        setFormData({
          clientName: "",
          designation: "",
          company: "",
          comment: "",
          systemCapacity: "",
          systemType: "",
          location: "",
          annual_energy_generation: "",
          annual_savings: "",
        });
      } else {
        setMessage("❌ Failed to add feedback.");
      }
    } catch (error) {
      console.error("Add feedback error:", error);
      setMessage("❌ Something went wrong.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-center">Add Client Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Client Name", name: "clientName" },
          { label: "Designation", name: "designation" },
          { label: "Company", name: "company" },
          { label: "System Capacity (kW)", name: "systemCapacity" },
          { label: "System Type", name: "systemType" },
          { label: "Location", name: "location" },
          { label: "Annual Energy Generation (kWh)", name: "annual_energy_generation" },
          { label: "Annual Savings ($)", name: "annual_savings" },
        ].map(({ label, name }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
              type={["systemCapacity", "annual_energy_generation", "annual_savings"].includes(name) ? "number" : "text"}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          Add Feedback
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
      )}
    </div>
  );
}
