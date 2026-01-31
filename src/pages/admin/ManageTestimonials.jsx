import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FaPlus, FaEdit, FaTrash, FaStar } from 'react-icons/fa';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const ManageTestimonials = () => {
    const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useApp();
    const [showModal, setShowModal] = useState(false);
    const [editingTest, setEditingTest] = useState(null);
    const [formData, setFormData] = useState({
        name: '', company: '', role: '', content: '', rating: 5, avatar: '', featured: false, order: 0, active: true,
    });

    const handleEdit = (test) => {
        setEditingTest(test);
        setFormData(test);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingTest) {
                await updateTestimonial(editingTest.id, formData);
            } else {
                await addTestimonial(formData);
            }
            setShowModal(false);
            resetForm();
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to save testimonial');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await deleteTestimonial(id);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const resetForm = () => {
        setEditingTest(null);
        setFormData({ name: '', company: '', role: '', content: '', rating: 5, avatar: '', featured: false, order: 0, active: true });
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Testimonials</h1>
                <Button variant="primary" icon={<FaPlus />} onClick={() => { resetForm(); setShowModal(true); }}>Add Testimonial</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((test) => (
                    <Card key={test.id}>
                        <div className="flex items-center mb-3">
                            <img src={test.avatar || 'https://via.placeholder.com/50'} alt={test.name} className="w-12 h-12 rounded-full mr-3" />
                            <div>
                                <h3 className="font-bold">{test.name}</h3>
                                <p className="text-sm text-gray-600">{test.role} at {test.company}</p>
                            </div>
                        </div>
                        <div className="flex mb-2">
                            {[...Array(test.rating)].map((_, i) => <FaStar key={i} className="text-yellow-400" />)}
                        </div>
                        <p className="text-gray-700 mb-3 italic text-sm">"{test.content}"</p>
                        <div className="text-xs text-gray-500 mb-3">
                            Order: {test.order} | {test.featured ? 'Featured' : 'Regular'} | {test.active ? 'Active' : 'Inactive'}
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" icon={<FaEdit />} onClick={() => handleEdit(test)}>Edit</Button>
                            <Button variant="outline" size="sm" icon={<FaTrash />} onClick={() => handleDelete(test.id)} className="text-red-600 border-red-600">Delete</Button>
                        </div>
                    </Card>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">{editingTest ? 'Edit' : 'Add'} Testimonial</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Name</label>
                                    <input type="text" className="w-full px-3 py-2 border rounded-md" value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Company</label>
                                    <input type="text" className="w-full px-3 py-2 border rounded-md" value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })} required />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Role</label>
                                <input type="text" className="w-full px-3 py-2 border rounded-md" value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })} required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Review Content</label>
                                <textarea className="w-full px-3 py-2 border rounded-md" rows="4" value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })} required />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
                                    <input type="number" min="1" max="5" className="w-full px-3 py-2 border rounded-md" value={formData.rating}
                                        onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })} required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Order</label>
                                    <input type="number" className="w-full px-3 py-2 border rounded-md" value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Avatar URL</label>
                                <input type="url" className="w-full px-3 py-2 border rounded-md" value={formData.avatar}
                                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })} placeholder="https://..." />
                            </div>
                            <div className="flex gap-4 mb-4">
                                <label className="flex items-center cursor-pointer">
                                    <input type="checkbox" className="mr-2" checked={formData.featured}
                                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} />
                                    <span className="text-sm font-medium">Featured</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input type="checkbox" className="mr-2" checked={formData.active}
                                        onChange={(e) => setFormData({ ...formData, active: e.target.checked })} />
                                    <span className="text-sm font-medium">Active</span>
                                </label>
                            </div>
                            <div className="flex gap-2 justify-end">
                                <Button type="button" variant="outline" onClick={() => { setShowModal(false); resetForm(); }}>Cancel</Button>
                                <Button type="submit" variant="primary">{editingTest ? 'Update' : 'Create'}</Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default ManageTestimonials;
