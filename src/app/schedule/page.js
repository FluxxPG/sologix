"use client"; // Add this line at the top

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import './tailwind.css'; // Ensure you have Tailwind CSS set up

const Schedule = () => {
  const [startDate, setStartDate] = useState(null);

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900">
      <div className="text-center">
        <h1 className="mb-6 text-2xl font-bold text-white">Schedule Calendar</h1>
        <div className="relative mb-4">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Select Date"
            className="w-40 px-4 py-2 font-bold text-white bg-blue-700 border-none rounded-lg shadow-lg appearance-none focus:outline-none"
            calendarClassName="bg-blue-700 text-white" // Tailwind CSS for calendar
          />
        </div>
        <button className="px-6 py-2 font-bold text-white bg-blue-700 rounded-lg shadow-lg hover:bg-blue-800 focus:outline-none">
          Book
        </button>
      </div>
    </div>
  );
};

export default Schedule;
