// Product Image Mapping Utility
export const productImageMap = {
  // On-Grid Solar Systems
  "On-Grid Solar System": [
    "/Product Images/ongrid-3kw.jpg",
    "/Product Images/ongrid-3kw-2.jpg", 
    "/Product Images/ongrid-3kw-3.png",
    "/Product Images/ongrid-3kw-4.jpg",
    "/Product Images/american-public-power-association-513dBrMJ_5w-unsplash.jpg",
    "/Product Images/american-public-power-association-dCx2xFuPWks-unsplash.jpg",
    "/Product Images/american-public-power-association-fm5_vCUa-Bc-unsplash.jpg",
    "/Product Images/american-public-power-association-XGAZzyLzn18-unsplash.jpg"
  ],
  
  // Off-Grid Solar Systems
  "Off-Grid Solar System": [
    "/Product Images/beautiful-alternative-energy-plant-with-solar-panels.jpg",
    "/Product Images/bernd-dittrich-6yTk5XAEajA-unsplash.jpg",
    "/Product Images/bernd-dittrich-CDA62CsGDDM-unsplash.jpg",
    "/Product Images/caspar-rae-7H_WbyDLpvk-unsplash.jpg",
    "/Product Images/caspar-rae-b6vAiN3wYNw-unsplash.jpg",
    "/Product Images/caspar-rae-zdynMHlDuwA-unsplash.jpg"
  ],
  
  // Hybrid Solar Systems
  "Hybrid Solar System": [
    "/Product Images/andreas-gucklhorn-7razCd-RUGs-unsplash.jpg",
    "/Product Images/andres-siimon-fCv4k5aAZf4-unsplash.jpg",
    "/Product Images/angie-warren-ZO7UsokVH98-unsplash.jpg",
    "/Product Images/antonio-garcia-ndz_u1_tFZo-unsplash.jpg",
    "/Product Images/asia-chang-Yr-PvhKiorM-unsplash.jpg"
  ],
  
  // Commercial Solar Systems
  "Commercial Solar System": [
    "/Product Images/benjamin-jopen-p2GuLUu79Rg-unsplash.jpg",
    "/Product Images/benjamin-jopen-To-B9ICXPnc-unsplash.jpg",
    "/Product Images/bill-mead-wmaP3Tl80ww-unsplash.jpg",
    "/Product Images/bradley-prentice-6ka0156E5Is-unsplash.jpg",
    "/Product Images/c-g-m4YOsFxziWE-unsplash.jpg"
  ],
  
  // Industrial Solar Systems
  "Industrial Solar System": [
    "/Product Images/chirayu-trivedi-twOIx6I35tk-unsplash.jpg",
    "/Product Images/chuttersnap-s_7BE4D2va0-unsplash.jpg",
    "/Product Images/dad-hotel--5JxaDg1gZU-unsplash.jpg",
    "/Product Images/dad-hotel-6Vd8Pt9zk4M-unsplash.jpg",
    "/Product Images/dad-hotel-6wg8GbD0UZ0-unsplash.jpg",
    "/Product Images/dad-hotel-eNzotIHdUsY-unsplash.jpg",
    "/Product Images/dad-hotel-iopyZ4hDCNQ-unsplash.jpg"
  ],
  
  // Residential Solar Systems
  "Residential Solar System": [
    "/Product Images/daniele-la-rosa-messina-3-Xc8g-Zkvw-unsplash.jpg",
    "/Product Images/daniele-la-rosa-messina-bfctRi7VIWA-unsplash.jpg",
    "/Product Images/daniele-la-rosa-messina-OiPtLN9_04w-unsplash.jpg",
    "/Product Images/danist-soh-cG_i_YmXsik-unsplash.jpg",
    "/Product Images/daria-nepriakhina-NFJ-Sj8ZcHQ-unsplash.jpg"
  ],
  
  // Solar Panels
  "Solar Panels": [
    "/Product Images/derek-sutton-rfgsYFb_5ow-unsplash.jpg",
    "/Product Images/derek-sutton-SxDPsKCGk40-unsplash.jpg",
    "/Product Images/gabriel-riFb-zdJ5QA-unsplash.jpg",
    "/Product Images/green-voltaics-energy-TtyY0tr7_as-unsplash.jpg",
    "/Product Images/guillherme-schneider-ecIS-bfYSG8-unsplash.jpg"
  ],
  
  // Solar Inverters
  "Solar Inverters": [
    "/Product Images/harisankar-hp6Xj7LyZ1E-unsplash.jpg",
    "/Product Images/insung-yoon-Wxg44AyonDw-unsplash.jpg",
    "/Product Images/istvan-hernek-tOKF2VSdpJM-unsplash.jpg",
    "/Product Images/jackery-power-station-AeZoW5oqB1Y-unsplash.jpg",
    "/Product Images/jason-mavrommatis-KRWfiWPqbq8-unsplash.jpg"
  ],
  
  // Solar Batteries
  "Solar Batteries": [
    "/Product Images/jeroen-van-de-water-aQOzmgcT6sI-unsplash.jpg",
    "/Product Images/joshua-tsu-eBHZCFIB3gE-unsplash.jpg",
    "/Product Images/jubbar-j-O8LNR5UARwM-unsplash.jpg",
    "/Product Images/justin-lim-Fpcy-AdFhUg-unsplash.jpg",
    "/Product Images/kay-dittner-nzmidcW30ao-unsplash.jpg"
  ],
  
  // Solar Accessories
  "Solar Accessories": [
    "/Product Images/loom-solar-tdqNjL7YdLU-unsplash.jpg",
    "/Product Images/maksym-diachenko-VfuY3s3w7sw-unsplash.jpg",
    "/Product Images/manny-becerra-NgdhrwAx0J8-unsplash.jpg",
    "/Product Images/marco-pregnolato-ZGhOgcMhNQg-unsplash.jpg",
    "/Product Images/mariana-proenca-_h0xG4s6NFg-unsplash.jpg"
  ],
  
  // Default fallback images
  "default": [
    "/Product Images/solar-panels-meadow.jpg",
    "/Product Images/3d-rendered-solar-panel-isolated-white-background.jpg",
    "/Product Images/man-worker-firld-by-solar-panels.jpg",
    "/Product Images/beautiful-alternative-energy-plant-with-solar-panels.jpg",
    "/Product Images/solar-panels-meadow.jpg"
  ]
};

// Get images for a specific product type
export const getProductImages = (productType) => {
  if (!productType) return productImageMap.default;
  
  // Try exact match first
  if (productImageMap[productType]) {
    return productImageMap[productType];
  }
  
  // Try partial match for variations
  const type = productType.toLowerCase();
  for (const [key, images] of Object.entries(productImageMap)) {
    if (key.toLowerCase().includes(type) || type.includes(key.toLowerCase())) {
      return images;
    }
  }
  
  // Return default if no match found
  return productImageMap.default;
};

// Get a random image from the product type
export const getRandomProductImage = (productType) => {
  const images = getProductImages(productType);
  return images[Math.floor(Math.random() * images.length)];
};

// Get primary image (first image) for a product type
export const getPrimaryProductImage = (productType) => {
  const images = getProductImages(productType);
  return images[0];
};

// Get all available product types
export const getAvailableProductTypes = () => {
  return Object.keys(productImageMap).filter(key => key !== 'default');
};

// Get image count for a product type
export const getImageCount = (productType) => {
  return getProductImages(productType).length;
};
