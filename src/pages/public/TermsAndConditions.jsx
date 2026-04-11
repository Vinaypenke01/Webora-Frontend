import { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import ConsentModal from '../../components/ui/ConsentModal';
import Alert from '../../components/ui/Alert';

const TermsAndConditions = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSuccess = () => {
        setShowSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setShowSuccess(false), 8000);
    };

    return (
        <div className="min-h-screen pb-20">
            <PageHeader 
                title="Terms and Conditions" 
                subtitle="Please read our terms carefully before proceeding with our services."
            />

            <div className="max-w-4xl mx-auto px-4 mt-12">
                {showSuccess && (
                    <div className="mb-8">
                        <Alert 
                            type="success" 
                            message="Thank you! Your consent has been recorded successfully. Our team will review it shortly."
                        />
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-sm border p-8 md:p-12 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. DEFINITIONS</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            <strong>"Services"</strong> shall mean the design, development, deployment, and maintenance of the website. 
                            <strong>"Deliverables"</strong> shall mean all outputs provided by the Freelancer to the Client. 
                            <strong>"Maintenance Period"</strong> shall mean the period of one (1) year commencing from the date of deployment.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. SCOPE OF SERVICES</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            2.1 The Freelancer (Digital Core) agrees to provide website design and development services as agreed upon. 
                            2.2 Any services not expressly included in the initial agreement shall be deemed "Additional Services" and may incur additional costs.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. PROJECT DELIVERY AND ACCEPTANCE</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            3.1 The Deliverables shall be deemed accepted by the Client upon deployment to the live server or upon written confirmation, whichever occurs first. 
                            3.2 Any objections or revision requests must be communicated in writing prior to final deployment.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. MAINTENANCE SERVICES</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            4.1 Digital Core provides one (1) year of maintenance starting from the actual deployment date. 
                            4.2 Maintenance includes: Critical bug fixes, minor content updates, and small UI adjustments to ensure optimal performance.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. CHANGE REQUEST POLICY</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            5.1 Clients are entitled to one (1) change request per month during the maintenance period. 
                            5.2 These requests must be minor modifications only. Major feature additions are outside the scope of standard maintenance.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. TURNAROUND TIME</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            6.1 We strive for excellence and efficiency. The standard turnaround time for minor change requests or bug fixes is 2 to 5 business days.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. INTELLECTUAL PROPERTY</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            7.1 Upon full and final payment, all rights, title, and interest in the Deliverables shall be transferred to the Client. 
                            7.2 Digital Core retains the right to use the Deliverables in their portfolio for promotional purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. CONFIDENTIALITY</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            8.1 Both parties agree to keep all project-related information, business secrets, and personal data confidential and not disclose it to any third party without prior written consent.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. LIMITATION OF LIABILITY</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            9.1 In no event shall Digital Core be liable for any indirect, special, or consequential damages. Total liability under this Agreement shall not exceed the fees paid for the specific services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">10. TERMINATION</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            10.1 Either party may terminate this Agreement with 15 days' written notice. 10.2 Upon termination, the Client shall pay for all work completed up to the termination date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">11. GOVERNING LAW</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            11.1 This Agreement shall be governed by and construed in accordance with the laws of India.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">12. DATA PRIVACY & CONSENT</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            By providing your information through our formal consent form, you authorize Digital Core to collect and store your business details for administrative and service-related purposes. We are committed to protecting your data and using it only to fulfill our contractual obligations.
                        </p>
                    </section>

                    <div className="pt-10 border-t flex flex-col items-center text-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to proceed?</h3>
                        <p className="text-gray-600 mb-8 max-w-md">
                            Please provide your details and formal consent to accept these terms and start your journey with us.
                        </p>
                        <Button 
                            variant="primary" 
                            size="lg"
                            onClick={() => setIsModalOpen(true)}
                            className="px-12 py-4 text-lg"
                        >
                            Accept & Consent
                        </Button>
                    </div>
                </div>
            </div>

            <ConsentModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSuccess={handleSuccess}
            />
        </div>
    );
};

export default TermsAndConditions;
