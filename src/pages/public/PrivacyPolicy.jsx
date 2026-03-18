import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaUserSecret, FaLock, FaDatabase } from 'react-icons/fa';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                            <FaShieldAlt size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
                            <p className="text-gray-500">Effective Date: March 18, 2026</p>
                        </div>
                    </div>

                    <div className="prose prose-blue max-w-none text-gray-600">
                        <section className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FaUserSecret className="text-blue-500" /> 1. Information We Collect
                            </h2>
                            <p>We collect information you provide directly to us when you use our services or provide consent. This includes:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Identity Data:</strong> Full name, business name.</li>
                                <li><strong>Contact Data:</strong> Email address, mobile phone number.</li>
                                <li><strong>Usage Data:</strong> Information about how you use our website and services.</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FaDatabase className="text-blue-500" /> 2. How We Use Your Data
                            </h2>
                            <p>We use the collected data for various purposes:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>To provide and maintain our services.</li>
                                <li>To generate and deliver your Service Agreement documents.</li>
                                <li>To notify you about changes to our services or project status.</li>
                                <li>To provide customer support and communication.</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FaLock className="text-blue-500" /> 3. Data Protection & Security
                            </h2>
                            <p>The security of your data is important to us. We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please remember that no method of transmission over the Internet is 100% secure.</p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Your Rights</h2>
                            <p>You have the right to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Access and receive a copy of your personal data.</li>
                                <li>Rectify any inaccurate or incomplete data.</li>
                                <li>Request the deletion of your data when it is no longer necessary for the purposes for which it was collected.</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Contact Us</h2>
                            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                            <div className="bg-blue-50 p-4 rounded-lg mt-4 border border-blue-100">
                                <p className="font-semibold text-blue-900">Digital Core</p>
                                <p>Email: info@digitalcoresolutions.com</p>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
