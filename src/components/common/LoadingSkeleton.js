"use client";
import React from 'react';

// Product Card Skeleton
export const ProductCardSkeleton = () => (
  <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-300"></div>
    <div className="p-6">
      <div className="h-6 bg-gray-300 rounded mb-4"></div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
      <div className="h-10 bg-gray-300 rounded"></div>
    </div>
  </div>
);

// Cart Item Skeleton
export const CartItemSkeleton = () => (
  <div className="flex flex-col md:flex-row border-b py-4 md:py-6 px-3 md:px-4 rounded-lg animate-pulse">
    <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-300 rounded-lg mb-2 md:mb-0 md:mr-6 flex-shrink-0"></div>
    <div className="flex-1">
      <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
      <div className="space-y-1 mb-2">
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      </div>
      <div className="h-5 bg-gray-300 rounded w-1/4"></div>
    </div>
  </div>
);

// Payment History Skeleton
export const PaymentHistorySkeleton = () => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="h-4 bg-gray-300 rounded w-20"></div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="h-4 bg-gray-300 rounded w-12"></div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {[...Array(3)].map((_, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-4 bg-gray-300 rounded w-24"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-4 bg-gray-300 rounded w-32"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-4 bg-gray-300 rounded w-28"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-4 bg-gray-300 rounded w-16"></div>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-1">
                  <div className="h-3 bg-gray-300 rounded w-20"></div>
                  <div className="h-3 bg-gray-300 rounded w-16"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Page Loading Skeleton
export const PageLoadingSkeleton = () => (
  <div className="min-h-screen bg-gray-100 p-4 md:p-6 animate-pulse">
    <div className="max-w-6xl mx-auto">
      <div className="h-8 bg-gray-300 rounded mb-6 w-1/3 mx-auto"></div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="space-y-4">
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-10 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  </div>
);

// Hero Section Skeleton
export const HeroSkeleton = () => (
  <div className="relative min-h-screen flex items-center justify-center overflow-hidden animate-pulse">
    <div className="absolute inset-0 w-full h-full bg-gray-300"></div>
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 z-10 py-12 md:py-20 relative">
      <div className="flex flex-col items-center text-center w-full max-w-4xl mx-auto px-2 sm:px-4">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="h-4 bg-gray-400 rounded mb-6 w-48 mx-auto"></div>
          <div className="h-16 bg-gray-400 rounded mb-6 w-full"></div>
          <div className="h-6 bg-gray-400 rounded mb-6 w-3/4 mx-auto"></div>
        </div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg">
              <div className="h-8 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Form Skeleton
export const FormSkeleton = () => (
  <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 animate-pulse">
    <div className="space-y-6">
      <div className="h-6 bg-gray-300 rounded w-1/2"></div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-10 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-10 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-10 bg-gray-300 rounded"></div>
      </div>
      <div className="h-10 bg-gray-300 rounded"></div>
    </div>
  </div>
);

export default {
  ProductCardSkeleton,
  CartItemSkeleton,
  PaymentHistorySkeleton,
  PageLoadingSkeleton,
  HeroSkeleton,
  FormSkeleton
};
