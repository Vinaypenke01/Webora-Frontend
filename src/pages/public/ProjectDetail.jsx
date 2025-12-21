import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const ProjectDetail = () => {
    const { id } = useParams();
    const { projects } = useApp();

    const project = projects.find(p => p.id === parseInt(id));

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2>Project Not Found</h2>
                    <Link to="/projects" className="text-primary hover:underline">
                        Back to Projects
                    </Link>
                </div>
            </div>
        );
    }

    const relatedProjects = projects
        .filter(p => p.category === project.category && p.id !== project.id)
        .slice(0, 3);

    return (
        <div>
            <PageHeader
                title={project.title}
                subtitle={project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                breadcrumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Projects', path: '/projects' },
                    { name: project.title },
                ]}
            />

            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        {/* Project Image */}
                        <div className="rounded-2xl overflow-hidden shadow-2xl mb-12">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-auto"
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                <h2 className="text-3xl font-bold mb-6">Project Overview</h2>
                                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                                    {project.description}
                                </p>

                                {project.challenge && (
                                    <>
                                        <h3 className="text-2xl font-bold mb-4">The Challenge</h3>
                                        <p className="text-lg text-gray-700 leading-relaxed mb-8">
                                            {project.challenge}
                                        </p>
                                    </>
                                )}

                                {/* Links */}
                                <div className="flex flex-wrap gap-4">
                                    {project.liveLink && (
                                        <a
                                            href={project.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Button variant="primary" icon={<FaExternalLinkAlt />}>
                                                View Live Site
                                            </Button>
                                        </a>
                                    )}
                                    {project.githubLink && (
                                        <a
                                            href={project.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Button variant="outline" icon={<FaGithub />}>
                                                View Code
                                            </Button>
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-1">
                                <Card>
                                    <h4 className="font-bold text-lg mb-4">Project Details</h4>

                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">Category</p>
                                            <p className="font-semibold capitalize">{project.category}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-600 mb-2">Technologies</p>
                                            <div className="flex flex-wrap gap-2">
                                                {(Array.isArray(project.techStack)
                                                    ? project.techStack
                                                    : (typeof project.techStack === 'string' ? project.techStack.split(',') : [])
                                                ).map((tech, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary rounded-full text-sm font-medium"
                                                    >
                                                        {tech.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                {/* CTA */}
                                <Card className="mt-6 bg-gradient-to-br from-primary/5 to-secondary/5">
                                    <h4 className="font-bold text-lg mb-3">Start Your Project</h4>
                                    <p className="text-gray-600 mb-4">
                                        Want something similar? Let's build it together!
                                    </p>
                                    <Link to="/contact">
                                        <Button variant="primary" className="w-full">
                                            Get a Quote
                                        </Button>
                                    </Link>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
                <section className="section-padding bg-gray-50">
                    <div className="container-custom">
                        <h2 className="text-center mb-12">More {project.category.charAt(0).toUpperCase() + project.category.slice(1)} Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedProjects.map(relatedProject => (
                                <Card key={relatedProject.id} className="overflow-hidden p-0">
                                    <div className="aspect-video overflow-hidden">
                                        <img
                                            src={relatedProject.image}
                                            alt={relatedProject.title}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h4 className="font-bold mb-2">{relatedProject.title}</h4>
                                        <p className="text-gray-600 text-sm mb-4">
                                            {relatedProject.description.slice(0, 80)}...
                                        </p>
                                        <Link
                                            to={`/projects/${relatedProject.id}`}
                                            className="text-primary hover:text-secondary font-semibold"
                                        >
                                            View Project →
                                        </Link>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default ProjectDetail;
