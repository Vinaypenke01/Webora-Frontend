import { Link } from 'react-router-dom';

const PageHeader = ({
    title,
    subtitle,
    breadcrumbs = [],
    image
}) => {
    return (
        <div
            className="relative hero-gradient text-white section-padding overflow-hidden"
            style={{
                backgroundImage: image ? `url(${image})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Overlay for better text visibility */}
            {image && <div className="absolute inset-0 bg-black/50"></div>}

            {/* Animated background circles */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container-custom relative z-10">
                {/* Breadcrumbs */}
                {breadcrumbs.length > 0 && (
                    <nav className="mb-4 animate-fade-in">
                        <ol className="flex flex-wrap items-center space-x-2 text-sm">
                            {breadcrumbs.map((crumb, index) => (
                                <li key={index} className="flex items-center">
                                    {index > 0 && <span className="mx-2">/</span>}
                                    {crumb.path ? (
                                        <Link
                                            to={crumb.path}
                                            className="hover:text-accent-300 transition-colors"
                                        >
                                            {crumb.name}
                                        </Link>
                                    ) : (
                                        <span className="text-gray-300">{crumb.name}</span>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </nav>
                )}

                {/* Title */}
                <h1 className="mb-4 animate-slide-up">{title}</h1>

                {/* Subtitle */}
                {subtitle && (
                    <p className="text-xl md:text-2xl text-gray-200 max-w-3xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
};

export default PageHeader;
