"use client";
import Image from 'next/image';
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Invoice = ({ crossPress, price }) => {
    const invoiceRef = useRef(null);


    const taxRate = 0.18;
    const tax = price * taxRate;
    const total = price + tax;

    const downloadPDF = async () => {
        const input = invoiceRef.current;
        const canvas = await html2canvas(input, {
            scale: 2,
            useCORS: true
        });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('invoice.pdf');
    };

    return (
        <div >

            <div className="relative">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        crossPress();
                    }}
                    className="absolute top-1 right-0 w-5 h-5 rounded bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition hide-in-pdf"
                >
                    X
                </button>
                <div ref={invoiceRef} className="w-full sm:max-w-4xl mx-auto my-10 p-4 sm:p-6 bg-white shadow-lg rounded-lg text-sm text-gray-700">


                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-4 gap-4">
                        <Image src="/header_logo.png" alt="Logo"
                            style={{ objectFit: 'contain' }}
                            width={130}
                            height={60}
                            className="h-[60px] max-w-[130px]"
                        />
                        <div className="text-right">
                            <p className="font-medium">STPI Building</p>
                            <p>Plot - 8, Namkum Industrial Area</p>
                            <p>Ranchi, Jharkhand - 834010</p>
                        </div>
                    </div>

                    {/* Invoice Info */}
                    <div className="flex justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Invoice To:</h2>
                            <p>John Doe</p>
                            <p>123 Main Street</p>
                            <p>Ranchi, Jharkhand - 834001</p>
                            <p>Email: john.doe@example.com</p>
                        </div>
                        <div className="text-right">
                            <h2 className="text-lg font-semibold mb-2">Invoice Details</h2>
                            <p>Invoice #: <span className="font-medium">INV-00123</span></p>
                            <p>Date: <span className="font-medium">April 8, 2025</span></p>
                            <p>Due Date: <span className="font-medium">April 15, 2025</span></p>
                        </div>
                    </div>

                    {/* Product Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border-collapse mb-6">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="border p-2">#</th>
                                    <th className="border p-2">Product</th>
                                    <th className="border p-2">Qty</th>
                                    <th className="border p-2">Price</th>
                                    {/* <th className="border p-2">Total</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border p-2">1</td>
                                    <td className="border p-2">On Grid Solar System</td>
                                    <td className="border p-2">1</td>
                                    <td className="border p-2">₹{price}</td>
                                    {/* <td className="border p-2">₹1000</td> */}
                                </tr>
                                {/* <tr>
            <td className="border p-2">2</td>
            <td className="border p-2">Hybrid Solar System</td>
            <td className="border p-2">1</td>
            <td className="border p-2">₹2000</td>
            <td className="border p-2">18%</td>
            <td className="border p-2">₹2360</td>
          </tr> */}
                            </tbody>
                        </table>
                    </div>

                    {/* Summary */}
                    <div className="flex justify-end">
                        <div className="w-full max-w-xs">
                            <div className="flex justify-between py-1">
                                <span>Subtotal:</span>
                                <span>₹{price}</span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span>Tax (18%):</span>
                                <span>₹{tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-t mt-2 font-semibold text-black">
                                <span>Total:</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-10 text-center text-xs text-gray-500">
                        Thank you for your business!<br />
                        This is a computer-generated invoice and does not require a signature.
                    </div>
                </div>
            </div>

            <div className="text-center mt-6">
                <button
                    onClick={downloadPDF}
                    className="bg-[#00237D] text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Download as PDF
                </button>
            </div>

        </div>
    );
};

export default Invoice;
