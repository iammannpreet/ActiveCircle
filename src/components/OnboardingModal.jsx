// OnboardingModal.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const OnboardingModal = ({ isVisible, onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            title: "Welcome to ActiveCircle",
            description: "Discover and join activities happening around you.",
        },
        {
            title: "Find Your Fitness Buddy",
            description: "Connect with like-minded individuals for shared activities.",
        },
        {
            title: "Organize Events",
            description: "Easily create and manage events based on your interests.",
        }
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onClose(); // Close modal on last step
        }
    };

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-white p-8 rounded-lg max-w-md w-full shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
            >
                <h2 className="text-2xl font-bold mb-4">{steps[currentStep].title}</h2>
                <p className="mb-6">{steps[currentStep].description}</p>
                <button
                    onClick={handleNext}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                    {currentStep < steps.length - 1 ? "Next" : "Get Started"}
                </button>
            </motion.div>
        </motion.div>
    );
};

export default OnboardingModal;
