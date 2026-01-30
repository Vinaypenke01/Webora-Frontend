import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { useApp } from '../../context/AppContext';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import ContactForm from '../../components/forms/ContactForm';
import { SEO } from '../../hooks/useSEO';

const Contact = () => {
    const { settings } = useApp();

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "DigitalCore",
        "image": "https://digitalcore.co.in/logo.png",
        "@id": "https://digitalcore.co.in",
        "url": "https://digitalcore.co.in",
        "telephone": settings.phone,
        "email": settings.email,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": settings.address,
            "addressCountry": "IN"
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "10:00",
                "closes": "16:00"
            }
        ]
    };

    return (
        <div>
            <SEO
                title="Contact Us - Get in Touch with DigitalCore | Free Consultation"
                description="Contact DigitalCore for professional web development and digital marketing services. Get a free consultation and quote. We're here to help transform your business online. Available Monday-Saturday."
                keywords="contact DigitalCore, web development inquiry, free consultation, get a quote, digital agency contact, web development company contact"
                canonicalUrl="https://digitalcore.co.in/contact"
                structuredData={structuredData}
            />
            <PageHeader
                title="Get In Touch"
                subtitle="Let's discuss your project and bring your ideas to life"
                breadcrumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Contact' },
                ]}
            />

            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
                            <p className="text-gray-600 mb-8">
                                Fill out the form below and we'll get back to you within 24 hours.
                            </p>
                            <ContactForm />
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                            <p className="text-gray-600 mb-8">
                                You can also reach us through any of the following channels.
                            </p>

                            <div className="space-y-6 mb-8">
                                <Card className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                                        <FaEnvelope className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">Email</h4>
                                        <p className="text-gray-600">{settings.email}</p>
                                    </div>
                                </Card>

                                <Card className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                                        <FaPhone className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">Phone</h4>
                                        <p className="text-gray-600">{settings.phone}</p>
                                    </div>
                                </Card>

                                <Card className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                                        <FaMapMarkerAlt className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">Office</h4>
                                        <p className="text-gray-600">{settings.address}</p>
                                    </div>
                                </Card>
                            </div>

                            {/* Business Hours */}
                            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
                                <h4 className="font-bold text-lg mb-4">Business Hours</h4>
                                <div className="space-y-2 text-gray-700">
                                    <div className="flex justify-between">
                                        <span>Monday - Friday</span>
                                        <span className="font-semibold">9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Saturday</span>
                                        <span className="font-semibold">10:00 AM - 4:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Sunday</span>
                                        <span className="font-semibold">Closed</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <h2 className="text-center mb-8">Find Us</h2>
                    <div className="rounded-2xl overflow-hidden shadow-xl h-96">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019324997679!2d-122.41941708468188!3d37.77492977975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="DigitalCore Location"
                        ></iframe>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
