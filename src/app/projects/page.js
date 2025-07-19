import React from 'react';

const Projects = () => {
  return (
    <div className="bg-blue-900 text-white p-6 md:p-10 rounded-lg">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-10">My Projects</h2>
      <div className="relative flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-4">
        <div className="absolute inset-x-0 top-1/2 h-0.5 bg-white md:block hidden"></div>
        <div className="relative bg-blue-700 p-4 md:p-5 rounded-lg text-center w-full md:w-40">
          <div className="mb-2">2nd April 2024</div>
          <div className="mb-2">Project Initiation</div>
          <div className="bg-green-600 rounded-lg py-1">Paid</div>
        </div>
        <div className="relative bg-blue-700 p-4 md:p-5 rounded-lg text-center w-full md:w-40">
          <div className="mb-2">15th April 2024</div>
          <div className="mb-2">Installation of Solar Panels Complete</div>
          <div className="bg-red-600 rounded-lg py-1">Due</div>
        </div>
        <div className="relative bg-blue-700 p-4 md:p-5 rounded-lg text-center w-full md:w-40">
          <div className="mb-2">23rd April 2024</div>
          <div className="mb-2">Installation of Power Supply and Setup</div>
          <div className="bg-red-600 rounded-lg py-1">Due</div>
        </div>
        <div className="relative bg-blue-700 p-4 md:p-5 rounded-lg text-center w-full md:w-40">
          <div className="mb-2">30th April 2024</div>
          <div className="mb-2">Installation of Power Supply Complete</div>
          <div className="bg-red-600 rounded-lg py-1">Due</div>
        </div>
      </div>
      <div className="flex justify-center mt-6 md:mt-10">
        <button className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg">Make Payment</button>
      </div>
    </div>
  );
};

export default Projects;
