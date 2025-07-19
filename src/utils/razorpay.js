import { loadScript } from './loadScript';

export const initializeRazorpay = async () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const makePayment = async ({ amount, name, email, phone, orderId, currency = 'INR', callback }) => {
  const res = await initializeRazorpay();

  if (!res) {
    alert('Razorpay SDK failed to load. Are you online?');
    return;
  }

  // Create options object for Razorpay
  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Razorpay Dashboard
    amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency,
    name: 'Sologix',
    description: 'Solar Product Purchase',
    image: '/logo.png', // Add your logo here
    order_id: orderId,
    handler: function (response) {
      // This function will be called when payment is successful
      callback({
        success: true,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
      });
    },
    prefill: {
      name,
      email,
      contact: phone,
    },
    notes: {
      address: 'Sologix Corporate Office',
    },
    theme: {
      color: '#00237D',
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};
