import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { FaArrowRight } from 'react-icons/fa';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Pagination from '../../components/ui/Pagination';
import EmptyState from '../../components/ui/EmptyState';
import { FaProjectDiagram } from 'react-icons/fa';

const Projects = () => {
    const { projects, loading } = useApp();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 6;

    const categories = ['all', 'website', 'app', 'dashboard'];

    // Filter projects
    const filteredProjects = (projects || []).filter(project => {
        const matchesCategory = selectedCategory === 'all' ||
            project.category?.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    })
        .sort((a, b) => b.id - a.id); // 🔥 Latest projects first
    // Pagination
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading Projects...</div>;
    }

    return (
        <div>
            <PageHeader
                title="Our Portfolio"
                subtitle="Explore our recent projects and success stories"
                breadcrumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Projects' },
                ]}
            />

            <section className="section-padding bg-white">
                <div className="container-custom">
                    {/* Filters */}
                    <div className="mb-8 space-y-4">
                        {/* Category Filters */}
                        <div className="flex flex-wrap gap-4 justify-center">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryChange(category)}
                                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${selectedCategory === category
                                        ? 'bg-gradient-to-r from-primary to-secondary text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                    {category !== 'all' && 's'}
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="max-w-md mx-auto">
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="input-field"
                            />
                        </div>
                    </div>

                    {/* Projects Grid */}
                    {currentProjects.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                {currentProjects.map(project => (
                                    <Card key={project.id} className="overflow-hidden p-0">
                                        <div className="aspect-video overflow-hidden">
                                            <img
                                                src={project.image || 'https://via.placeholder.com/600x400?text=Project+Image'}
                                                alt={project.title}
                                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <span className="text-sm text-primary font-semibold uppercase">
                                                {project.category}
                                            </span>
                                            <h3 className="text-xl font-bold mt-2 mb-3">{project.title}</h3>
                                            <p className="text-gray-600 mb-4">
                                                {project.description.slice(0, 100)}...
                                            </p>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {project.techStack.slice(0, 3).map((tech, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                            <Link
                                                to={`/projects/${project.id}`}
                                                className="text-primary hover:text-secondary font-semibold inline-flex items-center gap-2"
                                            >
                                                View Details <FaArrowRight className="text-sm" />
                                            </Link>
                                        </div>
                                    </Card>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            )}
                        </>
                    ) : (

                        <EmptyState
                            title="No Projects Found"
                            description={searchTerm ? `No projects match your search "${searchTerm}".` : "No projects found in this category."}
                            actionLabel="Clear Filters"
                            onAction={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                            icon={FaProjectDiagram}
                        />
                    )}
                </div>
            </section>
        </div>
    );
};

export default Projects;
