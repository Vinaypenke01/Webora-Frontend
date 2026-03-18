import { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import Alert from './Alert';
import api from '../../services/api';

const ConsentModal = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        mobile_number: '',
        business_name: '',
        is_consented: false,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.is_consented) {
            setError("You must agree to the terms and conditions.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await api.createConsent(formData);
            if (onSuccess) onSuccess();
            onClose();
        } catch (err) {
            console.error('Consent submission error:', err);
            setError(err.response?.data?.message || "Failed to submit consent. Please check your details.");
        } finally {
            setLoading(false);
        }
    };

    const footer = (
        <div className="flex justify-end gap-3 w-full">
            <Button variant="outline" onClick={onClose} disabled={loading}>
                Cancel
            </Button>
            <Button
                variant="primary"
                onClick={handleSubmit}
                isLoading={loading}
                disabled={!formData.is_consented || loading}
            >
                Submit Consent
            </Button>
        </div>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Terms & Conditions Consent"
            footer={footer}
            size="md"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <Alert type="error" message={error} />}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="full_name"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            placeholder="John Doe"
                            value={formData.full_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Mobile Number</label>
                        <input
                            type="tel"
                            name="mobile_number"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            placeholder="+1 234 567 890"
                            value={formData.mobile_number}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Business Name</label>
                        <input
                            type="text"
                            name="business_name"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            placeholder="Your Company Ltd"
                            value={formData.business_name}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="pt-4 border-t">
                    <div className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            id="is_consented"
                            name="is_consented"
                            className="mt-1 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                            checked={formData.is_consented}
                            onChange={handleChange}
                        />
                        <label htmlFor="is_consented" className="text-sm text-gray-600 leading-relaxed">
                            I hereby confirm that I have read, understood and agree to be bound by the 
                            <span className="text-primary font-semibold mx-1">Terms and Conditions</span> 
                            and Privacy Policy of Digital Core. I authorize the collection and processing 
                            of my data as described.
                        </label>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default ConsentModal;
