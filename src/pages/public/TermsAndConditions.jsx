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

                    {/* 1 */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">1. DEFINITIONS</h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li><strong>Services:</strong> Website design, development, deployment, and maintenance</li>
                            <li><strong>Deliverables:</strong> All outputs provided to the client</li>
                            <li><strong>Maintenance Period:</strong> 1 year from deployment</li>
                        </ul>
                    </section>

                    {/* 2 */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">2. SCOPE OF SERVICES</h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Website design & development as agreed</li>
                            <li>Any extra work is considered <strong>Additional Services</strong> (extra cost)</li>
                        </ul>
                    </section>

                    {/* 3 */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">3. PROJECT DELIVERY</h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Project is accepted when deployed or approved by client</li>
                            <li>All changes must be requested before final deployment</li>
                        </ul>
                    </section>

                    {/* 4 */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">4. MAINTENANCE</h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>1 year free maintenance from deployment</li>
                            <li>Includes bug fixes, minor updates, and UI improvements</li>
                        </ul>
                    </section>

                    {/* 5 */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">5. CHANGE REQUEST POLICY</h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>1 request allowed per month</li>
                            <li>Only minor changes included</li>
                            <li>Major features will cost extra</li>
                        </ul>
                    </section>

                    {/* 6 */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">6. TURNAROUND TIME</h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>2–5 business days for minor fixes or updates</li>
                        </ul>
                    </section>

                    {/* 7 */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">7. INTELLECTUAL PROPERTY</h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Ownership transferred after full payment</li>
                            <li>Digital Core can showcase work in portfolio</li>
                        </ul>
                    </section>

                    {/* 8 */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">8. CONFIDENTIALITY</h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>All data must be kept confidential</li>
                            <li>No sharing without prior permission</li>
                        </ul>
                    </section>

                    {/* 9 */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">9. LIMITATION OF LIABILITY</h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>No liability for indirect damages</li>
                            <li>Maximum liability = fees paid</li>
                        </ul>
                    </section>

                    {/* 10 */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">10. TERMINATION</h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>15 days notice required to terminate</li>
                            <li>Client must pay for completed work</li>
                        </ul>
                    </section>

                    {/* 11 */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">11. GOVERNING LAW</h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Governed by laws of India</li>
                        </ul>
                    </section>

                    {/* 12 */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">12. DATA PRIVACY & CONSENT</h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Client data is collected for service purposes only</li>
                            <li>Data is stored securely</li>
                            <li>No misuse of information</li>
                        </ul>
                    </section>

                    {/* CTA */}
                    <div className="pt-10 border-t flex flex-col items-center text-center">
                        <h3 className="text-xl font-bold mb-4">Ready to proceed?</h3>
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