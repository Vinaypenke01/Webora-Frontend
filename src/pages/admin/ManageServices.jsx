// Simplified ManageServices - similar structure to ManageProjects
import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';

const ManageServices = () => {
    const [success] = useState('');

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Services</h1>
                <p className="text-gray-600">Services management coming soon</p>
            </div>
            {success && <Alert type="success" message={success} />}
            <Card className="text-center py-12">
                <p className="text-gray-600">Service management functionality will be similar to Projects</p>
            </Card>
        </div>
    );
};

export default ManageServices;
