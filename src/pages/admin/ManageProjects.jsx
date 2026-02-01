import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Alert from '../../components/ui/Alert';
import Loader from '../../components/ui/Loader';
import Pagination from '../../components/ui/Pagination';
import EmptyState from '../../components/ui/EmptyState';
import { FaProjectDiagram } from 'react-icons/fa';

const ManageProjects = () => {
    const { projects, addProject, updateProject, deleteProject } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        category: 'website',
        description: '',
        challenge: '',
        image: '',
        techStack: '',
        liveLink: '',
        featured: false,
    });
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const handleOpenModal = (project = null) => {
        if (project) {
            setEditingProject(project);
            setFormData({
                ...project,
                techStack: project.techStack.join(', '),
            });
        } else {
            setEditingProject(null);
            setFormData({
                title: '',
                category: 'website',
                description: '',
                challenge: '',
                image: '',
                techStack: '',
                liveLink: '',
                featured: false,
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProject(null);
    };

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'file') {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const projectData = {
                ...formData,
                techStack: Array.isArray(formData.techStack)
                    ? formData.techStack
                    : formData.techStack.split(',').map(tech => tech.trim()).filter(Boolean),
            };

            if (editingProject) {
                await updateProject(editingProject.id, projectData);
                setSuccess('Project updated successfully!');
            } else {
                await addProject(projectData);
                setSuccess('Project added successfully!');
            }

            handleCloseModal();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Failed to save project');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await deleteProject(id);
                setSuccess('Project deleted successfully!');
                setTimeout(() => setSuccess(''), 3000);
            } catch (err) {
                setError('Failed to delete project');
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Projects</h1>
                    <p className="text-gray-600">Add, edit, or remove your portfolio projects</p>
                </div>
                <Button variant="primary" icon={<FaPlus />} onClick={() => handleOpenModal()}>
                    Add Project
                </Button>
            </div>

            {success && <Alert type="success" message={success} autoClose className="mb-6" />}
            {error && <Alert type="error" message={error} dismissible onClose={() => setError('')} className="mb-6" />}

            {projects.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects
                            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                            .map(project => (
                                <Card key={project.id} className="overflow-hidden p-0">
                                    <div className="aspect-video overflow-hidden">
                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <span className="text-sm text-primary font-semibold uppercase">{project.category}</span>
                                                <h3 className="text-xl font-bold mt-1">{project.title}</h3>
                                            </div>
                                            {project.featured && (
                                                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-600 mb-4 text-sm">{project.description.slice(0, 100)}...</p>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" icon={<FaEdit />} onClick={() => handleOpenModal(project)}>
                                                Edit
                                            </Button>
                                            <Button variant="danger" size="sm" icon={<FaTrash />} onClick={() => handleDelete(project.id)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(projects.length / itemsPerPage)}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </>
            ) : (
                <EmptyState
                    title="No Projects Found"
                    description="You haven't added any projects to your portfolio yet."
                    actionLabel="Add First Project"
                    onAction={() => handleOpenModal()}
                    icon={FaProjectDiagram}
                />
            )}



            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingProject ? 'Edit Project' : 'Add Project'}
                size="lg"
                footer={
                    <>
                        <Button variant="outline" onClick={handleCloseModal} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : editingProject ? 'Update' : 'Create'}
                        </Button>
                    </>
                }
            >
                {isSubmitting && <Loader fullScreen text={editingProject ? "Updating project..." : "Adding project..."} />}
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Title *</label>
                        <input name="title" value={formData.title} onChange={handleChange} className="input-field" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Category *</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="input-field">
                            <option value="website">Website</option>
                            <option value="app">App</option>
                            <option value="dashboard">Dashboard</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Description *</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} className="input-field" rows={3} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Challenge</label>
                        <textarea name="challenge" value={formData.challenge} onChange={handleChange} className="input-field" rows={2} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Project Image *</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            className="input-field"
                            accept="image/*"
                            required={!editingProject}
                        />
                        {editingProject && <p className="text-xs text-gray-500 mt-1">Leave empty to keep current image</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Tech Stack (comma-separated) *</label>
                        <input name="techStack" value={formData.techStack} onChange={handleChange} className="input-field" placeholder="React, Node.js, MongoDB" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Live Link</label>
                        <input name="liveLink" value={formData.liveLink} onChange={handleChange} className="input-field" />
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="mr-2" />
                        <label className="text-sm font-medium">Featured Project</label>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ManageProjects;
