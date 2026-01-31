import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { FaArrowRight, FaCheckCircle, FaStar } from 'react-icons/fa';
import * as Icons from 'react-icons/fa';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { SEO } from '../../hooks/useSEO';
import FAQ from '../../components/FAQ';
import { seoKeywords } from '../../utils/seo-keywords';
import { generateBreadcrumbSchema, generateAggregateRatingSchema } from '../../utils/schema-generator';

const Home = () => {
    const { projects, services, testimonials, technologies, settings } = useApp();

    const featuredProjects = (projects || []).filter(p => p.featured).slice(0, 3);

    // Filter and sort for active items only
    const activeTechnologies = (technologies || []).filter(t => t.active).sort((a, b) => a.order - b.order);
    const activeTestimonials = (testimonials || []).filter(t => t.active).sort((a, b) => a.order - b.order);

    // FAQ data for homepage
    const faqs = [
        {
            question: "What services does DigitalCore offer?",
            answer: "DigitalCore offers comprehensive digital solutions including custom web development, mobile app development (iOS & Android), e-commerce solutions, UI/UX design, digital marketing, SEO services, and cloud deployment. We specialize in modern technologies like React, Node.js, and provide end-to-end development services for businesses across India."
        },
        {
            question: "How much does web development cost in India?",
            answer: "Web development costs vary based on project complexity, features, and timeline. At DigitalCore, we offer flexible pricing packages starting from affordable rates for small businesses to enterprise solutions. Contact us for a free consultation and custom quote tailored to your specific requirements."
        },
        {
            question: "How long does it take to build a website?",
            answer: "A typical website takes 2-8 weeks depending on complexity. Simple websites can be completed in 2-3 weeks, while complex e-commerce or custom web applications may take 6-12 weeks. We provide detailed timelines during project planning and ensure on-time delivery with regular updates."
        },
        {
            question: "Do you provide SEO services?",
            answer: "Yes! DigitalCore offers comprehensive SEO services including keyword research, on-page optimization, technical SEO, link building, local SEO, and ongoing SEO maintenance. Our SEO experts use the latest 2026 strategies to help your website rank on the first page of Google and other search engines."
        },
        {
            question: "Do you offer support after website launch?",
            answer: "Absolutely! We provide ongoing maintenance and support packages including bug fixes, security updates, content updates, performance monitoring, and technical support. Our team is available to ensure your website runs smoothly and stays up-to-date with the latest technologies."
        }
    ];

    // Structured data for the home page
    const structuredData = [
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "DigitalCore",
            "url": "https://digitalcore.co.in",
            "description": "India's leading digital marketing agency and web development company providing professional web development, mobile apps, cloud solutions, and digital marketing services.",
            "potentialAction": {
                "@type": "SearchAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://digitalcore.co.in/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
            },
            "publisher": {
                "@type": "Organization",
                "name": "DigitalCore"
            }
        },
        generateBreadcrumbSchema([
            { name: "Home", url: "/" }
        ]),
        // Add aggregate rating from testimonials
        testimonials.length > 0 ? {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "DigitalCore",
            "aggregateRating": generateAggregateRatingSchema(testimonials)
        } : null
    ].filter(Boolean);


    return (
        <div>
            <SEO
                title="Best Digital Marketing Agency & Web Development Company India 2026 | DigitalCore"
                description="DigitalCore is India's #1 digital marketing agency & web development company. Expert SEO services, mobile app development, e-commerce solutions & cloud services. Transform your business with cutting-edge technology. Get free consultation today!"
                keywords={seoKeywords.getHomePageKeywords()}
                canonicalUrl="https://digitalcore.co.in/"
                structuredData={structuredData}
            />

            {/* Hero Section */}
            <section className="relative hero-gradient text-white section-padding pt-32 overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="mb-6 animate-slide-up">
                            {settings.hero?.title || 'Building Your Digital Presence'}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-100 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                            {settings.hero?.subtitle || 'We create stunning websites and web applications that help businesses grow and succeed online.'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
                            <Link to="/contact">
                                <Button variant="accent" size="lg" icon={<FaArrowRight />}>
                                    {settings.hero?.cta1 || 'Get Started'}
                                </Button>
                            </Link>
                            <Link to="/projects">
                                <Button variant="secondary" size="lg">
                                    {settings.hero?.cta2 || 'View Our Work'}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Wave separator */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 82.5C1200 85 1320 80 1380 77.5L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* Services Overview */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="mb-4">Our Services</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We offer comprehensive web development services to bring your vision to life
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.slice(0, 6).map((service) => {
                            const IconComponent = Icons[service.icon] || Icons.FaCode;
                            return (
                                <Card key={service.id} className="text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
                                        <IconComponent className="text-3xl text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                                    <p className="text-gray-600 mb-4">{service.shortDescription}</p>
                                    <Link to={`/services/${service.id}`} className="text-primary hover:text-secondary font-semibold inline-flex items-center gap-2">
                                        Learn More <FaArrowRight className="text-sm" />
                                    </Link>
                                </Card>
                            );
                        })}
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/services">
                            <Button variant="primary" size="lg">
                                View All Services
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="mb-4">Why Choose DigitalCore?</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We deliver exceptional results through expertise, innovation, and dedication
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: 'Expert Team', description: 'Experienced developers and designers' },
                            { title: 'Modern Tech', description: 'Latest frameworks and best practices' },
                            { title: 'Fast Delivery', description: 'On-time project completion' },
                            { title: 'Support', description: 'Ongoing maintenance and support' },
                        ].map((item, index) => (
                            <div key={index} className="text-center">
                                <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                                    <FaCheckCircle className="text-2xl text-green-600" />
                                </div>
                                <h4 className="font-bold mb-2">{item.title}</h4>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="mb-4">Featured Projects</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Explore some of our recent work and success stories
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProjects.map((project) => (
                            <Card key={project.id} className="overflow-hidden p-0">
                                <div className="aspect-video overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-6">
                                    <span className="text-sm text-primary font-semibold uppercase">{project.category}</span>
                                    <h3 className="text-xl font-bold mt-2 mb-3">{project.title}</h3>
                                    <p className="text-gray-600 mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.techStack.slice(0, 3).map((tech, index) => (
                                            <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <Link to={`/projects/${project.id}`} className="text-primary hover:text-secondary font-semibold inline-flex items-center gap-2">
                                        View Project <FaArrowRight className="text-sm" />
                                    </Link>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/projects">
                            <Button variant="primary" size="lg">
                                View All Projects
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section-padding bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="mb-4">What Our Clients Say</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Don't just take our word for it - hear from our satisfied clients
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {activeTestimonials.map((testimonial) => (
                            <Card key={testimonial.id}>
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <FaStar key={i} className="text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                                <div className="flex items-center">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <p className="font-bold">{testimonial.name}</p>
                                        <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="mb-4">Technologies We Use</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Building with the best and most modern tools
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
                        {activeTechnologies.map((tech, index) => {
                            const IconComponent = Icons[tech.icon] || Icons.FaCode;
                            return (
                                <div key={index} className="text-center group">
                                    <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center rounded-xl bg-gray-50 group-hover:bg-gray-100 transition-colors">
                                        <IconComponent className="text-4xl" style={{ color: tech.color }} />
                                    </div>
                                    <p className="text-sm font-medium text-gray-700">{tech.name}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <FAQ faqs={faqs} title="Frequently Asked Questions" />
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding hero-gradient text-white">
                <div className="container-custom text-center">
                    <h2 className="mb-6">Ready to Start Your Project?</h2>
                    <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
                        Let's work together to bring your ideas to life. Get in touch with us today!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/contact">
                            <Button variant="accent" size="lg" icon={<FaArrowRight />}>
                                Get a Free Quote
                            </Button>
                        </Link>
                        <Link to="/pricing">
                            <Button variant="secondary" size="lg">
                                View Pricing
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
