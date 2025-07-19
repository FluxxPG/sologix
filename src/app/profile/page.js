"use client";

import React, { useState } from 'react';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const handleUpdate = () => {
    // Handle the update logic here
    console.log('Profile updated', { email, phone, password, rePassword });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2D479C] p-4">
      <div className="w-full max-w-xs md:max-w-md lg:max-w-lg">
        <div className="px-8 pt-6 pb-8 mb-4">
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-6 text-white">My Profile</h2>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
              Email ID
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="phone">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              autoComplete="new-password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="re-password">
              Re-Set Password
            </label>
            <input
              type="password"
              id="re-password"
              autoComplete="new-password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={handleUpdate}
              className="bg-[#0C2D86]  hover:bg-blue-700 text-white font-bold py-2 px-10 rounded-full  shadow-xl "
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
