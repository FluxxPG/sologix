import React from 'react';

const Receipt = () => {
  return (
    <div className="bg-blue-900 text-white min-h-screen p-4 sm:p-8 relative">
      <button className="absolute left-4 top-4 text-3xl">&larr;</button>
      <h1 className="text-3xl sm:text-4xl mb-8 text-center">Receipt</h1>
      <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-4 space-y-4 sm:space-y-0">
        {bills.map((bill, index) => (
          <div key={index} className="p-6 text-center w-full sm:w-48">
            <div className="text-6xl mb-4">&#128196;</div>
            <div className="mb-6">
              <p>{bill.name}</p>
              <p>{bill.date}</p>
            </div>
            <button className="bg-blue-600 rounded py-2 px-4">Download</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const bills = [
  { name: '1st Installment Bill', date: '2nd April 2024' },
  { name: '2nd Installment Bill', date: '2nd April 2024' },
  { name: '3rd Installment Bill', date: '2nd April 2024' },
  { name: '4th Installment Bill', date: '2nd April 2024' },
];

export default Receipt;
