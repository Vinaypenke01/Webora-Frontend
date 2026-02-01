import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect with debounce for better performance
    useEffect(() => {
        let timeoutId;
        const handleScroll = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setScrolled(window.scrollY > 50);
            }, 10);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeoutId);
        };
    }, []);

    // Close mobile menu on window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024 && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isOpen]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Projects', path: '/projects' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' },
    ];

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <>
            <nav
                className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled
                        ? 'bg-white shadow-md py-2'
                        : 'bg-transparent py-4'
                    }`}
            >
                <div className="container-custom">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link
                            to="/"
                            className="flex items-center h-14 w-36 sm:h-16 sm:w-40 relative z-50 transition-transform hover:scale-105 duration-200"
                            onClick={closeMenu}
                        >
                            <img
                                src={logo}
                                alt="DigitalCore"
                                className="max-h-full max-w-full object-contain"
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `relative px-3 xl:px-4 py-2 font-medium transition-all duration-200 rounded-lg group ${isActive
                                            ? 'text-primary'
                                            : scrolled
                                                ? 'text-gray-700 hover:text-primary hover:bg-gray-50'
                                                : 'text-white hover:text-gray-200 hover:bg-white/10'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {link.name}
                                            <span
                                                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-200 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                                    }`}
                                            />
                                        </>
                                    )}
                                </NavLink>
                            ))}
                            <Link
                                to="/contact"
                                className="btn btn-primary ml-2 xl:ml-4 shadow-lg hover:shadow-xl transition-shadow duration-200"
                            >
                                Get Started
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMenu}
                            className={`lg:hidden relative z-50 p-2 rounded-lg transition-all duration-200 ${scrolled
                                    ? 'text-gray-900 hover:bg-gray-100'
                                    : 'text-white hover:bg-white/10'
                                }`}
                            aria-label={isOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isOpen}
                        >
                            <div className="w-6 h-6 flex items-center justify-center">
                                {isOpen ? (
                                    <FaTimes className="text-2xl" />
                                ) : (
                                    <FaBars className="text-2xl" />
                                )}
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation Overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                    onClick={closeMenu}
                    aria-hidden="true"
                />
            )}

            {/* Mobile Navigation Menu */}
            <div
                className={`lg:hidden fixed right-0 top-0 h-full w-full sm:w-80 bg-white z-40 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full pt-24 px-6 pb-6 overflow-y-auto">
                    {/* Mobile Navigation Links */}
                    <nav className="flex flex-col space-y-1">
                        {navLinks.map((link, index) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    `text-lg font-medium py-3 px-4 rounded-lg transition-all duration-200 ${isActive
                                        ? 'text-primary bg-primary/10'
                                        : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                                    }`
                                }
                                style={{
                                    animation: isOpen ? `slideIn 0.3s ease-out ${index * 0.05}s both` : 'none'
                                }}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Mobile CTA Button */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <Link
                            to="/contact"
                            onClick={closeMenu}
                            className="btn btn-primary w-full text-center shadow-lg"
                            style={{
                                animation: isOpen ? 'slideIn 0.3s ease-out 0.35s both' : 'none'
                            }}
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Optional: Additional Info in Mobile Menu */}
                    <div
                        className="mt-auto pt-6"
                        style={{
                            animation: isOpen ? 'slideIn 0.3s ease-out 0.4s both' : 'none'
                        }}
                    >
                        <p className="text-sm text-gray-500 text-center">
                            Ready to transform your digital presence?
                        </p>
                    </div>
                </div>
            </div>

            {/* Keyframe animation for mobile menu items */}
            <style jsx>{`
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>
        </>
    );
};

export default Navbar;