"use client"
import { useRouter } from "next/navigation";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

const FailureModal = ({ isOpen, onClose }) => {
    const router = useRouter();
    
    const handleRedirect = () => {
        router.push("/afterleadingpage");
    };
    
    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose}
            className="bg-white"
        >
            <ModalContent>
                <ModalHeader className="flex flex-col items-center gap-1">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <div className="text-xl font-semibold text-red-600">Order Failed!</div>
                </ModalHeader>
                <ModalBody className="text-center pb-4">
                    <p className="text-gray-600">
                        Unfortunately, we couldn't process your order. Please try again later or contact support.
                    </p>
                </ModalBody>
                <ModalFooter className="flex justify-center">
                    <Button color="primary" onClick={handleRedirect} className="bg-red-500 text-white mb-5">
                        Go to Homepage
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default FailureModal;
