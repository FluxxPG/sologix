"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";

const SuccessModal = ({ isOpen, onClose }) => {
    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose}
            className="bg-white"
        >
            <ModalContent>
                <ModalHeader className="flex flex-col items-center gap-1">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div className="text-xl font-semibold text-[#00237D]">Order Confirmed!</div>
                </ModalHeader>
                <ModalBody className="text-center pb-6">
                    <p className="text-gray-600">
                        Thank you for your order. Our team will contact you shortly to proceed with the installation process.
                    </p>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default SuccessModal;
