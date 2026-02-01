import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FaPlus, FaEdit, FaTrash, FaBlog } from 'react-icons/fa';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Alert from '../../components/ui/Alert';
import Loader from '../../components/ui/Loader';
import Pagination from '../../components/ui/Pagination';
import EmptyState from '../../components/ui/EmptyState';

const ManageBlogs = () => {
    const { blogs, addBlog, updateBlog, deleteBlog } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        author: '',
        category: 'Development',
        tags: '',
        featuredImage: '',
        readTime: '',
    });
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const handleOpenModal = (blog = null) => {
        if (blog) {
            setEditingBlog(blog);
            setFormData({
                ...blog,
                tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags || '',
            });
        } else {
            setEditingBlog(null);
            setFormData({
                title: '',
                slug: '',
                excerpt: '',
                content: '',
                author: '',
                category: 'Development',
                tags: '',
                featuredImage: '',
                readTime: '',
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingBlog(null);
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const blogData = {
                ...formData,
                tags: typeof formData.tags === 'string'
                    ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
                    : formData.tags,
                publishedDate: editingBlog ? editingBlog.publishedDate : new Date().toISOString().split('T')[0],
            };

            if (editingBlog) {
                await updateBlog(editingBlog.id, blogData);
                setSuccess('Blog post updated successfully!');
            } else {
                await addBlog(blogData);
                setSuccess('Blog post added successfully!');
            }

            handleCloseModal();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.slug?.[0] || 'Failed to save blog post');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            setIsLoading(true);
            try {
                await deleteBlog(id);
                setSuccess('Blog post deleted successfully!');
                setTimeout(() => setSuccess(''), 3000);
            } catch (err) {
                setError('Failed to delete blog post');
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div>
            {isLoading && <Loader fullScreen text={editingBlog ? 'Updating...' : 'Processing...'} />}

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Blogs</h1>
                    <p className="text-gray-600">Create and manage your insights and news</p>
                </div>
                <Button variant="primary" icon={<FaPlus />} onClick={() => handleOpenModal()}>
                    Add Blog
                </Button>
            </div>

            {success && <Alert type="success" message={success} autoClose className="mb-6" />}
            {error && <Alert type="error" message={error} dismissible onClose={() => setError('')} className="mb-6" />}

            {blogs.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs
                            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                            .map(blog => (
                                <Card key={blog.id} className="overflow-hidden p-0">
                                    <div className="aspect-video overflow-hidden">
                                        <img
                                            src={typeof blog.featuredImage === 'string' ? blog.featuredImage : (blog.featuredImage instanceof File ? URL.createObjectURL(blog.featuredImage) : '')}
                                            alt={blog.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <span className="text-sm text-primary font-semibold uppercase">{blog.category}</span>
                                                <h3 className="text-lg font-bold mt-1 line-clamp-2">{blog.title}</h3>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 mb-4 text-sm line-clamp-3">{blog.excerpt}</p>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" icon={<FaEdit />} onClick={() => handleOpenModal(blog)}>
                                                Edit
                                            </Button>
                                            <Button variant="danger" size="sm" icon={<FaTrash />} onClick={() => handleDelete(blog.id)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(blogs.length / itemsPerPage)}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </>
            ) : (
                <EmptyState
                    title="No Blogs Found"
                    description="You haven't created any blog posts yet. Start sharing your thoughts and news!"
                    actionLabel="Add First Blog"
                    onAction={() => handleOpenModal()}
                    icon={FaBlog}
                />
            )}



            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingBlog ? 'Edit Blog Post' : 'Add Blog Post'}
                size="lg"
                footer={
                    <>
                        <Button variant="outline" onClick={handleCloseModal} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSubmit} loading={isLoading}>
                            {editingBlog ? 'Update' : 'Create'}
                        </Button>
                    </>
                }
            >
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Title *</label>
                        <input name="title" value={formData.title} onChange={handleChange} className="input-field" required />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Slug *</label>
                        <input name="slug" value={formData.slug} onChange={handleChange} className="input-field" placeholder="e-g-blog-title" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Category *</label>
                        <input name="category" value={formData.category} onChange={handleChange} className="input-field" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Author *</label>
                        <input name="author" value={formData.author} onChange={handleChange} className="input-field" required />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Excerpt *</label>
                        <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} className="input-field" rows={2} required />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Content *</label>
                        <textarea name="content" value={formData.content} onChange={handleChange} className="input-field" rows={5} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Featured Image *</label>
                        <input
                            type="file"
                            name="featuredImage"
                            onChange={handleChange}
                            className="input-field"
                            accept="image/*"
                            required={!editingBlog}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Read Time (e.g., 5 min read) *</label>
                        <input name="readTime" value={formData.readTime} onChange={handleChange} className="input-field" required />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                        <input name="tags" value={formData.tags} onChange={handleChange} className="input-field" placeholder="React, Frontend, Web Design" />
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ManageBlogs;


