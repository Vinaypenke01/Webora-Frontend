import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import logo from '../assets/logo.png';

const Footer = () => {
    const { settings } = useApp();

    const quickLinks = [
        { name: 'About Us', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Projects', path: '/projects' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' },
        { name: 'Pricing', path: '/pricing' },
    ];

    const services = [
        { name: 'Website Development', path: '/services' },
        { name: 'Web Applications', path: '/services' },
        { name: 'UI/UX Design', path: '/services' },
        { name: 'Maintenance & Support', path: '/services' },
        { name: 'SEO & Performance', path: '/services' },
    ];

    const socialLinks = [
        { icon: FaFacebook, url: settings.social?.facebook, name: 'Facebook' },
        { icon: FaTwitter, url: settings.social?.twitter, name: 'Twitter' },
        { icon: FaLinkedin, url: settings.social?.linkedin, name: 'LinkedIn' },
        { icon: FaInstagram, url: settings.social?.instagram, name: 'Instagram' },
        { icon: FaGithub, url: settings.social?.github, name: 'GitHub' },
    ];

    return (
        <footer className="bg-gradient-to-br from-primary via-secondary to-accent text-white">
            <div className="container-custom py-12 md:py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div>
                        <img src={logo} alt="Webora Solutions" className="h-16 mb-4" />
                        <p className="text-gray-200 mb-4">
                            {settings.tagline || 'Building Your Digital Presence'}
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-accent-300 transition-colors text-xl"
                                    aria-label={social.name}
                                >
                                    <social.icon />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-200 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Services</h3>
                        <ul className="space-y-2">
                            {services.map((service, index) => (
                                <li key={index}>
                                    <Link
                                        to={service.path}
                                        className="text-gray-200 hover:text-white transition-colors"
                                    >
                                        {service.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <FaEnvelope className="text-accent-300 mt-1 flex-shrink-0" />
                                <span className="text-gray-200">{settings.email}</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <FaPhone className="text-accent-300 mt-1 flex-shrink-0" />
                                <span className="text-gray-200">{settings.phone}</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <FaMapMarkerAlt className="text-accent-300 mt-1 flex-shrink-0" />
                                <span className="text-gray-200">{settings.address}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-white/20 pt-8 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-200 text-sm">
                            © {new Date().getFullYear()} {settings.companyName || 'Webora Solutions'}. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <Link to="#" className="text-gray-200 hover:text-white text-sm transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="#" className="text-gray-200 hover:text-white text-sm transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
