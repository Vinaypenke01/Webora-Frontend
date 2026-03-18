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
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                        <p className="text-gray-600 leading-relaxed">
                            By accessing or using Digital Core's services, you agree to be bound by these Terms and Conditions. 
                            If you do not agree with any part of these terms, you must not use our services. We reserve the right 
                            to modify these terms at any time, and your continued use of our services signifies your acceptance 
                            of any updated terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Services</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Digital Core provides digital agency services, including but not limited to web development, 
                            mobile app design, UI/UX design, and digital marketing. The specific scope of work for each project 
                            will be detailed in a separate Statement of Work (SOW).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Privacy & Consent</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We value your privacy. By providing your information through our consent form, you authorize us to 
                            collect and store your name, email, mobile number, and business details for service-related communications 
                            and administrative purposes. We will not share your data with third parties without your explicit consent, 
                            except as required by law.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Client Responsibilities</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Clients are responsible for providing accurate information and timely feedback requested by Digital Core 
                            to ensure the successful delivery of projects. Any delays caused by the client may impact 
                            project timelines and costs.
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
