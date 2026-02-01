import { Link } from 'react-router-dom';
import { FaStar, FaArrowRight, FaCode, FaCheckCircle } from 'react-icons/fa';
import * as Icons from 'react-icons/fa';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import FAQ from '../../components/FAQ';
import { useApp } from '../../context/AppContext';
import { SEO } from '../../hooks/useSEO';
import { seoKeywords } from '../../utils/seo-keywords';
import { generateBreadcrumbSchema, generateAggregateRatingSchema } from '../../utils/schema-generator';
import TechAutoSlider from '../../components/ui/TechAutoSlider';

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
        <div className="overflow-x-hidden">
            <SEO
                title="Best Digital Marketing Agency & Web Development Company India 2026 | DigitalCore"
                description="DigitalCore is India's #1 digital marketing agency & web development company. Expert SEO services, mobile app development, e-commerce solutions & cloud services. Transform your business with cutting-edge technology. Get free consultation today!"
                keywords={seoKeywords.getHomePageKeywords()}
                canonicalUrl="https://digitalcore.co.in/"
                structuredData={structuredData}
            />

            {/* Hero Section - Enhanced */}
            <section className="relative hero-gradient text-white section-padding pt-24 md:pt-32 lg:pt-40 overflow-hidden min-h-[calc(100vh-80px)] flex items-center">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-10 md:top-20 left-5 md:left-10 w-48 md:w-72 h-48 md:h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-10 md:bottom-20 right-5 md:right-10 w-64 md:w-96 h-64 md:h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                    {/* Additional decorative elements */}
                    <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-white/20 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
                </div>

                <div className="container-custom relative z-10 w-full">
                    <div className="max-w-4xl mx-auto text-center px-4">
                        <h1 className="mb-4 md:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-slide-up">
                            {settings.hero?.title || 'Building Your Digital Presence'}
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-6 md:mb-8 leading-relaxed animate-slide-up px-4" style={{ animationDelay: '0.1s' }}>
                            {settings.hero?.subtitle || 'We create stunning websites and web applications that help businesses grow and succeed online.'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center animate-slide-up px-4" style={{ animationDelay: '0.2s' }}>
                            <Link to="/contact" className="w-full sm:w-auto">
                                <Button variant="accent" size="lg" icon={<FaArrowRight />} className="w-full sm:w-auto">
                                    {settings.hero?.cta1 || 'Get Started'}
                                </Button>
                            </Link>
                            <Link to="/projects" className="w-full sm:w-auto">
                                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                                    {settings.hero?.cta2 || 'View Our Work'}
                                </Button>
                            </Link>
                        </div>

                        {/* Trust indicators */}
                        <div className="mt-8 md:mt-12 flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm md:text-base opacity-90">
                            <div className="flex items-center gap-2">
                                <FaCheckCircle className="text-green-300" />
                                <span>100+ Projects Delivered</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaStar className="text-yellow-300" />
                                <span>5-Star Rated</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaCheckCircle className="text-green-300" />
                                <span>24/7 Support</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wave separator - Responsive */}
                <div className="absolute bottom-0 left-0 right-0 w-full">
                    <svg
                        viewBox="0 0 1440 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-auto"
                        preserveAspectRatio="none"
                    >
                        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 82.5C1200 85 1320 80 1380 77.5L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* Services Overview - Enhanced */}
            <section className="section-padding bg-white">
                <div className="container-custom px-4">
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="mb-3 md:mb-4 text-2xl md:text-3xl lg:text-4xl">Our Services</h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                            We offer comprehensive web development services to bring your vision to life
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {services.slice(0, 6).map((service) => {
                            const IconComponent = Icons[service.icon] || Icons.FaCode;
                            return (
                                <Card
                                    key={service.id}
                                    className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                                >
                                    <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                                        <IconComponent className="text-2xl md:text-3xl text-white" />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold mb-3">{service.title}</h3>
                                    <p className="text-sm md:text-base text-gray-600 mb-4 line-clamp-3">{service.shortDescription}</p>
                                    <Link
                                        to={`/services/${service.id}`}
                                        className="text-primary hover:text-secondary font-semibold inline-flex items-center gap-2 transition-colors"
                                        aria-label={`Learn more about ${service.title}`}
                                    >
                                        Learn More <FaArrowRight className="text-sm" />
                                    </Link>
                                </Card>
                            );
                        })}
                    </div>

                    <div className="text-center mt-8 md:mt-12">
                        <Link to="/services">
                            <Button variant="primary" size="lg">
                                View All Services
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us - Enhanced */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom px-4">
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="mb-3 md:mb-4 text-2xl md:text-3xl lg:text-4xl">Why Choose DigitalCore?</h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                            We deliver exceptional results through expertise, innovation, and dedication
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {[
                            {
                                title: 'Expert Team',
                                description: 'Experienced developers and designers with proven track record',
                                icon: '👥'
                            },
                            {
                                title: 'Modern Tech',
                                description: 'Latest frameworks and industry best practices',
                                icon: '⚡'
                            },
                            {
                                title: 'Fast Delivery',
                                description: 'On-time project completion guaranteed',
                                icon: '🚀'
                            },
                            {
                                title: '24/7 Support',
                                description: 'Ongoing maintenance and dedicated support',
                                icon: '🛡️'
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="text-center p-6 rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="text-4xl md:text-5xl mb-4">{item.icon}</div>
                                <h4 className="font-bold text-lg md:text-xl mb-2">{item.title}</h4>
                                <p className="text-sm md:text-base text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Projects - Enhanced */}
            <section className="section-padding bg-white">
                <div className="container-custom px-4">
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="mb-3 md:mb-4 text-2xl md:text-3xl lg:text-4xl">Featured Projects</h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                            Explore some of our recent work and success stories
                        </p>
                    </div>

                    {featuredProjects.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                {featuredProjects.map((project) => (
                                    <Card
                                        key={project.id}
                                        className="overflow-hidden p-0 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                                    >
                                        <div className="aspect-video overflow-hidden bg-gray-100">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="p-5 md:p-6">
                                            <span className="text-xs md:text-sm text-primary font-semibold uppercase tracking-wide">
                                                {project.category}
                                            </span>
                                            <h3 className="text-lg md:text-xl font-bold mt-2 mb-3 line-clamp-2">
                                                {project.title}
                                            </h3>
                                            <p className="text-sm md:text-base text-gray-600 mb-4 line-clamp-3">
                                                {project.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {project.techStack.slice(0, 3).map((tech, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 md:px-3 py-1 bg-gray-100 rounded-full text-xs md:text-sm text-gray-700 font-medium"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.techStack.length > 3 && (
                                                    <span className="px-2 md:px-3 py-1 bg-gray-200 rounded-full text-xs md:text-sm text-gray-600">
                                                        +{project.techStack.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                            <Link
                                                to={`/projects/${project.id}`}
                                                className="text-primary hover:text-secondary font-semibold inline-flex items-center gap-2 transition-colors text-sm md:text-base"
                                                aria-label={`View ${project.title} project details`}
                                            >
                                                View Project <FaArrowRight className="text-sm" />
                                            </Link>
                                        </div>
                                    </Card>
                                ))}
                            </div>

                            <div className="text-center mt-8 md:mt-12">
                                <Link to="/projects">
                                    <Button variant="primary" size="lg">
                                        View All Projects
                                    </Button>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No featured projects available at the moment.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Testimonials - Enhanced */}
            {activeTestimonials.length > 0 && (
                <section className="section-padding bg-gradient-to-br from-primary/5 to-secondary/5">
                    <div className="container-custom px-4">
                        <div className="text-center mb-8 md:mb-12">
                            <h2 className="mb-3 md:mb-4 text-2xl md:text-3xl lg:text-4xl">What Our Clients Say</h2>
                            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                                Don't just take our word for it - hear from our satisfied clients
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {activeTestimonials.slice(0, 3).map((testimonial) => (
                                <Card
                                    key={testimonial.id}
                                    className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <div className="flex items-center mb-4 gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className={`${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'} text-lg`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-sm md:text-base text-gray-700 mb-6 italic leading-relaxed line-clamp-6">
                                        "{testimonial.content}"
                                    </p>
                                    <div className="flex items-center pt-4 border-t border-gray-100">
                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-3 md:mr-4 object-cover"
                                            loading="lazy"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-sm md:text-base truncate">{testimonial.name}</p>
                                            <p className="text-xs md:text-sm text-gray-600 truncate">
                                                {testimonial.role}, {testimonial.company}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Tech Stack - Auto Slider */}
            <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
                <div className="text-center py-8 md:py-12 px-4">
                    <h2 className="mb-3 md:mb-4 text-2xl md:text-3xl lg:text-4xl">Technologies We Use</h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
                        Building with the best and most modern tools
                    </p>
                </div>

                <TechAutoSlider technologies={activeTechnologies} />
            </section>

            {/* FAQ Section - Enhanced */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom px-4">
                    <FAQ
                        faqs={faqs}
                        title="Frequently Asked Questions"
                    />
                </div>
            </section>

            {/* CTA Section - Enhanced */}
            <section className="section-padding hero-gradient text-white relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
                </div>

                <div className="container-custom text-center relative z-10 px-4">
                    <h2 className="mb-4 md:mb-6 text-2xl md:text-3xl lg:text-4xl">Ready to Start Your Project?</h2>
                    <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
                        Let's work together to bring your ideas to life. Get in touch with us today!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
                        <Link to="/contact" className="w-full sm:w-auto">
                            <Button variant="accent" size="lg" icon={<FaArrowRight />} className="w-full sm:w-auto">
                                Get a Free Quote
                            </Button>
                        </Link>
                        <Link to="/pricing" className="w-full sm:w-auto">
                            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                                View Pricing
                            </Button>
                        </Link>
                    </div>

                    {/* Additional trust signal */}
                    <p className="mt-6 md:mt-8 text-sm md:text-base text-gray-200 opacity-90">
                        ✓ Free consultation • ✓ No obligation quote • ✓ Quick response time
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;