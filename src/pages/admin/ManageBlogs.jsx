// Simplified ManageBlogs
import { useState } from 'react';
import Card from '../../components/ui/Card';
import Alert from '../../components/ui/Alert';

const ManageBlogs = () => {
    const [success] = useState('');

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Blogs</h1>
                <p className="text-gray-600">Blog management coming soon</p>
            </div>
            {success && <Alert type="success" message={success} />}
            <Card className="text-center py-12">
                <p className="text-gray-600">Blog management functionality will be similar to Projects</p>
            </Card>
        </div>
    );
};

export default ManageBlogs;
