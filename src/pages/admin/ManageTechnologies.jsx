import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import * as Icons from 'react-icons/fa';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Pagination from '../../components/ui/Pagination';
import EmptyState from '../../components/ui/EmptyState';

const ManageTechnologies = () => {
    const { technologies, addTechnology, updateTechnology, deleteTechnology } = useApp();
    const [showModal, setShowModal] = useState(false);
    const [editingTech, setEditingTech] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        icon: 'FaCode',
        color: '#000000',
        order: 0,
        active: true,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const handleEdit = (tech) => {
        setEditingTech(tech);
        setFormData(tech);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingTech) {
                await updateTechnology(editingTech.id, formData);
            } else {
                await addTechnology(formData);
            }
            setShowModal(false);
            resetForm();
        } catch (error) {
            console.error('Error saving technology:', error);
            alert('Failed to save technology');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await deleteTechnology(id);
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to delete');
            }
        }
    };

    const resetForm = () => {
        setEditingTech(null);
        setFormData({ name: '', icon: 'FaCode', color: '#000000', order: 0, active: true });
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Technologies</h1>
                <Button variant="primary" icon={<FaPlus />} onClick={() => { resetForm(); setShowModal(true); }}>
                    Add Technology
                </Button>
            </div>

            {technologies.length > 0 ? (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {technologies
                            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                            .map((tech) => {
                                const IconComponent = Icons[tech.icon] || Icons.FaCode;
                                return (
                                    <Card key={tech.id} className="text-center">
                                        <IconComponent className="text-5xl mx-auto mb-3" style={{ color: tech.color }} />
                                        <h3 className="font-bold mb-2">{tech.name}</h3>
                                        <div className="text-xs text-gray-500 mb-3">Order: {tech.order}</div>
                                        <div className="flex gap-1 justify-center">
                                            <button onClick={() => handleEdit(tech)} className="p-2 hover:bg-gray-100 rounded">
                                                <FaEdit />
                                            </button>
                                            <button onClick={() => handleDelete(tech.id)} className="p-2 hover:bg-red-100 rounded text-red-600">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </Card>
                                );
                            })}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(technologies.length / itemsPerPage)}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </>
            ) : (
                <EmptyState
                    title="No Technologies Found"
                    description="You haven't added any technologies yet. Add the tools you use!"
                    actionLabel="Add Technology"
                    onAction={() => { resetForm(); setShowModal(true); }}
                    icon={Icons.FaCode}
                />
            )}



            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <Card className="max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">{editingTech ? 'Edit' : 'Add'} Technology</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input type="text" className="w-full px-3 py-2 border rounded-md" value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Icon (React Icons name)</label>
                                <input type="text" className="w-full px-3 py-2 border rounded-md" value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })} placeholder="FaReact" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Color</label>
                                <input type="color" className="w-full h-10 border rounded-md" value={formData.color}
                                    onChange={(e) => setFormData({ ...formData, color: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Order</label>
                                    <input type="number" className="w-full px-3 py-2 border rounded-md" value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} />
                                </div>
                                <div className="flex items-center">
                                    <label className="flex items-center cursor-pointer">
                                        <input type="checkbox" className="mr-2" checked={formData.active}
                                            onChange={(e) => setFormData({ ...formData, active: e.target.checked })} />
                                        <span className="text-sm font-medium">Active</span>
                                    </label>
                                </div>
                            </div>
                            <div className="flex gap-2 justify-end">
                                <Button type="button" variant="outline" onClick={() => { setShowModal(false); resetForm(); }}>Cancel</Button>
                                <Button type="submit" variant="primary">{editingTech ? 'Update' : 'Create'}</Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default ManageTechnologies;
