// This file contains Razorpay configuration
// In production, these values should be set in .env.local file

export const RAZORPAY_CONFIG = {
  // Replace these with your actual Razorpay API keys
  KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_your_key_id',
  KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || 'your_key_secret',
  
  // This is only used on the server side and should be kept secret
  // Never expose KEY_SECRET to the client
};
