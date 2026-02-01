import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FaPlus, FaEdit, FaTrash, FaStar } from 'react-icons/fa';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const ManagePricing = () => {
    const { pricingPlans, addPricingPlan, updatePricingPlan, deletePricingPlan } = useApp();
    const [showModal, setShowModal] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        features: [''],
        popular: false,
        order: 0,
        active: true,
    });

    const handleEdit = (plan) => {
        setEditingPlan(plan);
        setFormData({
            name: plan.name,
            price: plan.price,
            description: plan.description,
            features: plan.features,
            popular: plan.popular,
            order: plan.order,
            active: plan.active,
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingPlan) {
                await updatePricingPlan(editingPlan.id, formData);
            } else {
                await addPricingPlan(formData);
            }
            setShowModal(false);
            resetForm();
        } catch (error) {
            console.error('Error saving pricing plan:', error);
            alert('Failed to save pricing plan');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this pricing plan?')) {
            try {
                await deletePricingPlan(id);
            } catch (error) {
                console.error('Error deleting pricing plan:', error);
                alert('Failed to delete pricing plan');
            }
        }
    };

    const resetForm = () => {
        setEditingPlan(null);
        setFormData({
            name: '',
            price: '',
            description: '',
            features: [''],
            popular: false,
            order: 0,
            active: true,
        });
    };

    const addFeature = () => {
        setFormData({ ...formData, features: [...formData.features, ''] });
    };

    const updateFeature = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    const removeFeature = (index) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData({ ...formData, features: newFeatures });
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Pricing Plans</h1>
                <Button
                    variant="primary"
                    icon={<FaPlus />}
                    onClick={() => {
                        resetForm();
                        setShowModal(true);
                    }}
                >
                    Add Pricing Plan
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pricingPlans.map((plan) => (
                    <Card key={plan.id} className="relative">
                        {plan.popular && (
                            <div className="absolute -top-3 right-4">
                                <span className="bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                                    <FaStar /> Popular
                                </span>
                            </div>
                        )}
                        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                        <div className="text-3xl font-bold text-primary mb-2"> ₹{plan.price}</div>
                        <p className="text-gray-600 mb-4">{plan.description}</p>
                        <ul className="space-y-2 mb-4">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="text-sm text-gray-700">• {feature}</li>
                            ))}
                        </ul>
                        <div className="text-sm text-gray-500 mb-4">
                            Order: {plan.order} | Status: {plan.active ? 'Active' : 'Inactive'}
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                icon={<FaEdit />}
                                onClick={() => handleEdit(plan)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                icon={<FaTrash />}
                                onClick={() => handleDelete(plan.id)}
                                className="text-red-600 border-red-600 hover:bg-red-50"
                            >
                                Delete
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">
                            {editingPlan ? 'Edit Pricing Plan' : 'Add Pricing Plan'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border rounded-md"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Price</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border rounded-md"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    className="w-full px-3 py-2 border rounded-md"
                                    rows="3"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Features</label>
                                {formData.features.map((feature, index) => (
                                    <div key={index} className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            className="flex-1 px-3 py-2 border rounded-md"
                                            value={feature}
                                            onChange={(e) => updateFeature(index, e.target.value)}
                                            placeholder="Feature description"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => removeFeature(index)}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                                    + Add Feature
                                </Button>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Order</label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border rounded-md"
                                        value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                    />
                                </div>
                                <div className="flex items-center">
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={formData.popular}
                                            onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                                        />
                                        <span className="text-sm font-medium">Popular</span>
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={formData.active}
                                            onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                        />
                                        <span className="text-sm font-medium">Active</span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex gap-2 justify-end">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setShowModal(false);
                                        resetForm();
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" variant="primary">
                                    {editingPlan ? 'Update' : 'Create'}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default ManagePricing;
