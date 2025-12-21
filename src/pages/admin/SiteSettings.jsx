import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';

const SiteSettings = () => {
    const { settings, updateSettings } = useApp();
    const [formData, setFormData] = useState({
        email: settings.email || '',
        phone: settings.phone || '',
        address: settings.address || '',
    });
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateSettings(formData);
            setSuccess('Settings updated successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Site Settings</h1>
                <p className="text-gray-600">Update your website settings and contact information</p>
            </div>

            {success && <Alert type="success" message={success} autoClose className="mb-6" />}

            <Card className="max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input-field"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <input
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            className="input-field"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="input-field"
                            rows={3}
                        />
                    </div>

                    <Button type="submit" variant="primary">
                        Save Settings
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default SiteSettings;
