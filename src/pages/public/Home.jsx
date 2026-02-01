import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaArrowRight, FaCode, FaCheckCircle, FaProjectDiagram, FaQuoteLeft } from 'react-icons/fa';
import * as Icons from 'react-icons/fa';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import FAQ from '../../components/FAQ';
import { useApp } from '../../context/AppContext';
import { SEO } from '../../hooks/useSEO';
import { seoKeywords } from '../../utils/seo-keywords';
import { generateBreadcrumbSchema, generateAggregateRatingSchema } from '../../utils/schema-generator';
import EmptyState from '../../components/ui/EmptyState';
const TechAutoSlider = lazy(() => import('../../components/ui/TechAutoSlider'));

const Home = () => {
    const { projects, services, testimonials, technologies, settings } = useApp();

    const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
    const activeTestimonials = testimonials.filter(t => t.active).slice(0, 3);
    const activeTechnologies = technologies.filter(t => t.active);

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

    return (
        <div>
            {/* ... SEO and Hero Section ... */}
            <SEO
                title="Webora - Modern Web Development Solutions"
                description="Webora offers top-notch web development, app development, and UI/UX design services. Transform your digital presence with our expert solutions."
                keywords={seoKeywords.home}
                schema={[
                    generateBreadcrumbSchema([
                        { name: 'Home', path: '/' }
                    ]),
                    generateAggregateRatingSchema(activeTestimonials),
                    {
                        "@context": "https://schema.org",
                        "@type": "ProfessionalService",
                        "name": "Webora",
                        "image": "https://webora.com/logo.png",
                        "description": "Professional web development agency specializing in React, Node.js, and modern web technologies.",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "San Francisco",
                            "addressRegion": "CA",
                            "postalCode": "94105",
                            "addressCountry": "US"
                        },
                        "priceRange": "$$$"
                    }
                ]}
            />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-500">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent skew-x-12 transform origin-top-right"></div>
                <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-secondary/5 to-transparent -skew-x-12 transform origin-bottom-left"></div>

                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8 animate-fade-in-up">
                            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                                🚀 Elevate Your Digital Presence
                            </span>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                                Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Digital Experiences</span> That Matter
                            </h1>
                            <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                                We craft stunning websites, powerful applications, and intuitive designs that drive growth and engage users.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/contact">
                                    <Button variant="primary" size="lg" icon={<FaArrowRight />} iconPosition="right">
                                        Start Your Project
                                    </Button>
                                </Link>
                                <Link to="/projects">
                                    <Button variant="outline" size="lg">
                                        View Our Work
                                    </Button>
                                </Link>
                            </div>

                            <div className="flex items-center gap-8 pt-8 border-t border-gray-100">
                                <div>
                                    <h4 className="text-3xl font-bold text-gray-900">50+</h4>
                                    <p className="text-gray-500 text-sm">Projects Completed</p>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-bold text-gray-900">30+</h4>
                                    <p className="text-gray-500 text-sm">Happy Clients</p>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-bold text-gray-900">5★</h4>
                                    <p className="text-gray-500 text-sm">Client Rating</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative animate-fade-in hidden lg:block">
                            <div className="relative z-10 bg-white p-4 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                                <img
                                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Web Development Dashboard"
                                    className="rounded-xl w-full h-auto"
                                />
                                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg animate-bounce-slow">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                            <FaCheckCircle />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">Project Success</p>
                                            <p className="text-xs text-gray-500">Delivered on time</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-10 right-10 w-full h-full border-2 border-primary/20 rounded-2xl -z-10 transform translate-x-4 translate-y-4"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Overview */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Expertise</span>
                        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Comprehensive Digital Solutions</h2>
                        <p className="text-gray-600">We offer a full spectrum of services to help your business thrive in the digital landscape.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.slice(0, 3).map(service => {
                            const IconComponent = Icons[service.icon] || Icons.FaCode;
                            return (
                                <Card key={service.id} className="group hover:-translate-y-2 transition-transform duration-300 border-t-4 border-transparent hover:border-primary">
                                    <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-2xl mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                        <IconComponent />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                                    <p className="text-gray-600 mb-6">{service.description.slice(0, 100)}...</p>
                                    <Link to={`/services/${service.id}`} className="inline-flex items-center text-primary font-semibold hover:text-secondary group-hover:translate-x-1 transition-transform">
                                        Learn More <FaArrowRight className="ml-2" />
                                    </Link>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div className="max-w-xl">
                            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Recent Work</span>
                            <h2 className="text-3xl md:text-4xl font-bold mt-2">Featured Projects</h2>
                        </div>
                        <Link to="/projects">
                            <Button variant="outline" className="mt-4 md:mt-0">View All Projects</Button>
                        </Link>
                    </div>

                    {featuredProjects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredProjects.map(project => (
                                <Card key={project.id} className="p-0 overflow-hidden group">
                                    <div className="relative aspect-video overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                            <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                <span className="text-sm font-medium text-primary-light uppercase mb-1 block">{project.category}</span>
                                                <h3 className="text-xl font-bold">{project.title}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                                        <Link to={`/projects/${project.id}`} className="text-primary font-semibold hover:text-secondary inline-flex items-center">
                                            View Case Study <FaArrowRight className="ml-2 text-sm" />
                                        </Link>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            title="No Projects Yet"
                            description="We are currently compiling our latest work. Check back soon!"
                            icon={FaProjectDiagram}
                        />
                    )}
                </div>
            </section>

            {/* Technologies Section */}
            <section className="py-16 bg-white overflow-hidden">
                <div className="container-custom text-center mb-10">
                    <p className="text-gray-500 font-medium">Powered by modern technologies</p>
                </div>

                <Suspense fallback={<div className="h-32 flex items-center justify-center bg-gray-50"><div className="animate-pulse bg-gray-200 h-16 w-3/4 rounded"></div></div>}>
                    <TechAutoSlider technologies={activeTechnologies} />
                </Suspense>
            </section>

            {/* Testimonials */}
            <section className="section-padding bg-primary/5">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider">Testimonials</span>
                        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">What Our Clients Say</h2>
                    </div>

                    {activeTestimonials.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {activeTestimonials.map(testimonial => (
                                <Card key={testimonial.id} className="relative pt-12">
                                    <div className="absolute -top-6 left-8 w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center text-xl shadow-lg">
                                        <FaQuoteLeft />
                                    </div>
                                    <p className="text-gray-600 italic mb-6">"{testimonial.text}"</p>
                                    <div className="flex items-center gap-4 border-t pt-4 border-gray-100">
                                        <img
                                            src={testimonial.image || 'https://via.placeholder.com/100?text=User'}
                                            alt={testimonial.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                            <p className="text-xs text-gray-500">{testimonial.position}, {testimonial.company}</p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            title="No Testimonials Yet"
                            description="Be the first to share your experience with us!"
                            icon={FaStar}
                        />
                    )}
                </div>
            </section>



            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

                <div className="container-custom relative z-10 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
                        Let's collaborate to build something amazing together. Get in touch with us today for a free consultation.
                    </p>
                    <Link to="/contact">
                        <Button variant="primary" size="lg" className="bg-white text-primary hover:bg-gray-100 border-none">
                            Get a Free Quote
                        </Button>
                    </Link>
                </div>
            </section>
            {/* FAQ Section - Enhanced */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="text-primary font-bold tracking-wider uppercase text-sm">Common Questions</span>
                        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Frequently Asked Questions</h2>
                        <p className="text-gray-600">Got questions? We've got answers to help you understand our process and services.</p>
                    </div>

                    <FAQ faqs={faqs} />
                </div>
            </section>
        </div>
    );
};

export default Home;