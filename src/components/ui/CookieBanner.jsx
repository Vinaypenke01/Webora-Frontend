import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCookieBite, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('digital_core_cookie_consent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('digital_core_cookie_consent', 'true');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-12 md:max-w-md z-50"
                >
                    <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600 shrink-0">
                                <FaCookieBite size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center justify-between">
                                    Cookie Consent
                                    <button 
                                        onClick={() => setIsVisible(false)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <FaTimes />
                                    </button>
                                </h3>
                                <p className="text-gray-600 text-sm mt-1">
                                    We use cookies to enhance your experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies. Read our <Link to="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link> for more info.
                                </p>
                                <div className="mt-4 flex gap-3">
                                    <button
                                        onClick={handleAccept}
                                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => setIsVisible(false)}
                                        className="bg-gray-100 text-gray-700 py-2 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                                    >
                                        Decline
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieBanner;
