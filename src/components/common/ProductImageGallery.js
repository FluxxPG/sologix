"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getShuffledProductImagesWithUniqueFirst, getFallbackImages, resetUsedImages } from '@/utils/productImages';

export const ProductImageGallery = ({ 
  productType, 
  productName, 
  className = "",
  showGallery = false,
  onImageClick = null,
  imageHeight = "h-48 sm:h-56 md:h-64 lg:h-72"
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [failedImages, setFailedImages] = useState(new Set());
  const [images, setImages] = useState([]);
  
  // Get fresh unique images when component mounts
  useEffect(() => {
    const freshImages = getShuffledProductImagesWithUniqueFirst(productType);
    setImages(freshImages);
  }, [productType]);
  
  const currentImage = images[currentImageIndex];
  
  // Filter out failed images
  const validImages = images.filter((_, index) => !failedImages.has(index));
  const validCurrentImage = validImages[currentImageIndex] || validImages[0];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
    setIsImageLoading(true);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
    setIsImageLoading(true);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
    setIsImageLoading(true);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
    // Mark this image as failed
    const originalIndex = images.findIndex(img => img === validCurrentImage);
    if (originalIndex !== -1) {
      setFailedImages(prev => new Set([...prev, originalIndex]));
    }
  };

  const handleImageClick = () => {
    if (onImageClick) {
      onImageClick(validImages, currentImageIndex);
    } else if (showGallery) {
      setShowFullGallery(true);
    }
    // If showGallery is false, do nothing - no modal will open
  };

  if (validImages.length === 0) {
    // Use fallback images if all original images failed
    const fallbackImages = getFallbackImages();
    return (
      <div className={`relative ${className}`}>
        <div className={`relative w-full ${imageHeight} group`}>
          <Image
            src={fallbackImages[0]}
            alt={`${productName} - Solar System (Fallback)`}
            fill
            className="object-cover transition-all duration-300"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Main Image Display */}
      <div className={`relative w-full ${imageHeight} group`}>
        <Image
          src={validCurrentImage}
          alt={`${productName} - Solar System`}
          fill
          className={`object-cover transition-all duration-300 ${
            showGallery ? 'cursor-pointer' : 'cursor-default'
          } ${
            isImageLoading ? 'opacity-0' : 'opacity-100'
          } group-hover:scale-105`}
          priority={currentImageIndex === 0}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          onLoad={() => setIsImageLoading(false)}
          onError={handleImageError}
          onClick={handleImageClick}
        />
        
        {/* Loading Skeleton */}
        {isImageLoading && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-lg" />
        )}
        
        {/* Image Counter */}
        {validImages.length > 1 && (
          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
            {currentImageIndex + 1}/{validImages.length}
          </div>
        )}
        
        {/* Navigation Arrows */}
        {validImages.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Previous image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Next image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
        
        {/* Gallery Icon */}
        {validImages.length > 1 && showGallery && (
          <div className="absolute bottom-2 right-2 bg-blue-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </div>
        )}
      </div>
      
      {/* Thumbnail Strip */}
      {validImages.length > 1 && (
        <div className="flex space-x-1 overflow-x-auto pb-2 mt-2">
          {validImages.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`relative w-12 h-8 flex-shrink-0 rounded border-2 transition-all duration-200 ${
                index === currentImageIndex 
                  ? 'border-blue-500 ring-2 ring-blue-200' 
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover rounded"
                sizes="48px"
              />
            </button>
          ))}
        </div>
      )}
      
      {/* Full Gallery Modal */}
      {showFullGallery && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setShowFullGallery(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="relative w-full h-96 sm:h-[500px]">
              <Image
                src={validCurrentImage}
                alt={`${productName} - Full view`}
                fill
                className="object-contain"
                priority
              />
            </div>
            
            {validImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
