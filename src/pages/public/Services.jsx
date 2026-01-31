import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import * as Icons from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import { SEO } from '../../hooks/useSEO';
import { seoKeywords } from '../../utils/seo-keywords';
import { generateBreadcrumbSchema, generateServiceSchema } from '../../utils/schema-generator';

const Services = () => {
    const { services } = useApp();
    const activeServices = (services || []).filter(s => s.active);

    const structuredData = [
        {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": activeServices.map((service, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    ...generateServiceSchema(service),
                    "url": `https://digitalcore.co.in/services/${service.id}`
                }
            }))
        },
        generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" }
        ])
    ];

    return (
        <div>
            <SEO
                title="Professional Web Development & Digital Marketing Services India | Top Solutions 2026"
                description="Explore DigitalCore's comprehensive digital services: custom web development, mobile app development, e-commerce solutions, UI/UX design, SEO services, and cloud deployment. Professional solutions tailored to your business needs across India."
                keywords={seoKeywords.getServicesPageKeywords()}
                canonicalUrl="https://digitalcore.co.in/services"
                structuredData={structuredData}
            />
            <PageHeader
                title="Our Services"
                subtitle="Comprehensive web development solutions tailored to your needs"
                breadcrumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Services' },
                ]}
            />

            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {activeServices.map((service) => {
                            const IconComponent = Icons[service.icon] || Icons.FaCode;

                            return (
                                <Card key={service.id}>
                                    <div className="w-16 h-16 mb-6 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
                                        <IconComponent className="text-3xl text-white" />
                                    </div>

                                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                                    <p className="text-gray-600 mb-6">{service.shortDescription}</p>

                                    <ul className="space-y-2 mb-6">
                                        {service.benefits?.slice(0, 3).map((benefit, index) => (
                                            <li key={index} className="flex items-start">
                                                <Icons.FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                                                <span className="text-gray-700">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        to={`/services/${service.id}`}
                                        className="text-primary hover:text-secondary font-semibold inline-flex items-center gap-2"
                                    >
                                        Learn More <FaArrowRight className="text-sm" />
                                    </Link>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="container-custom text-center">
                    <h2 className="mb-6">Not Sure Which Service You Need?</h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Let's discuss your project and find the perfect solution together
                    </p>
                    <Link to="/contact">
                        <button className="btn btn-primary btn-lg">
                            Contact Us Today
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Services;
