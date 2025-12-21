import { useState } from 'react';
import { validateContactForm } from '../../utils/validation';
import { useApp } from '../../context/AppContext';
import Button from '../ui/Button';
import Alert from '../ui/Alert';

const ContactForm = () => {
    const { addMessage } = useApp();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        const validation = validateContactForm(formData);
        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        setLoading(true);
        try {
            await addMessage(formData);
            setSuccess(true);
            setFormData({ name: '', email: '', phone: '', message: '' });
            setTimeout(() => setSuccess(false), 5000);
        } catch (error) {
            setErrors({ submit: 'Failed to send message. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {success && (
                <Alert
                    type="success"
                    message="Thank you for your message! We'll get back to you soon."
                    autoClose
                    duration={5000}
                />
            )}

            {errors.submit && (
                <Alert
                    type="error"
                    message={errors.submit}
                    dismissible
                    onClose={() => setErrors(prev => ({ ...prev, submit: '' }))}
                />
            )}

            {/* Name */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="Your name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="your.email@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone (Optional)
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
                    placeholder="+1 (555) 123-4567"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            {/* Message */}
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`input-field resize-none ${errors.message ? 'border-red-500' : ''}`}
                    placeholder="Tell us about your project..."
                />
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full"
            >
                Send Message
            </Button>
        </form>
    );
};

export default ContactForm;
