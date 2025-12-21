import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import * as Icons from 'react-icons/fa';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const ServiceDetail = () => {
    const { id } = useParams();
    const { services, projects } = useApp();

    const service = services.find(s => s.id === parseInt(id));

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2>Service Not Found</h2>
                    <Link to="/services" className="text-primary hover:underline">
                        Back to Services
                    </Link>
                </div>
            </div>
        );
    }

    const IconComponent = Icons[service.icon] || Icons.FaCode;
    const relatedProjects = projects.filter(p =>
        p.description.toLowerCase().includes(service.title.toLowerCase().split(' ')[0])
    ).slice(0, 3);

    return (
        <div>
            <PageHeader
                title={service.title}
                subtitle={service.shortDescription}
                breadcrumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Services', path: '/services' },
                    { name: service.title },
                ]}
            />

            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        {/* Icon and Description */}
                        <div className="flex items-start gap-6 mb-12">
                            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center flex-shrink-0">
                                <IconComponent className="text-4xl text-white" />
                            </div>
                            <div>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        </div>

                        {/* Benefits */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold mb-6">What You Get</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {service.benefits?.map((benefit, index) => (
                                    <div key={index} className="flex items-start">
                                        <Icons.FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Process */}
                        {service.process && (
                            <div className="mb-12">
                                <h3 className="text-2xl font-bold mb-6">Our Process</h3>
                                <div className="space-y-6">
                                    {service.process.map((step, index) => (
                                        <div key={index} className="flex gap-6">
                                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-lg mb-2">{step.step}</h4>
                                                <p className="text-gray-600">{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CTA */}
                        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 text-center">
                            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                                Let's discuss how we can help you with {service.title.toLowerCase()}
                            </p>
                            <Link to="/contact">
                                <Button variant="primary" size="lg">
                                    Request a Quote
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
                <section className="section-padding bg-gray-50">
                    <div className="container-custom">
                        <h2 className="text-center mb-12">Related Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedProjects.map((project) => (
                                <Card key={project.id} className="overflow-hidden p-0">
                                    <div className="aspect-video overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h4 className="font-bold mb-2">{project.title}</h4>
                                        <p className="text-gray-600 text-sm mb-4">{project.description.slice(0, 100)}...</p>
                                        <Link to={`/projects/${project.id}`} className="text-primary hover:text-secondary font-semibold inline-flex items-center gap-2">
                                            View Project <Icons.FaArrowRight className="text-sm" />
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

export default ServiceDetail;
