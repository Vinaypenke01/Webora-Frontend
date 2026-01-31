const Loader = ({ size = 'md', fullScreen = false, text = '' }) => {
    const sizes = {
        sm: 'w-12 h-12',
        md: 'w-20 h-20',
        lg: 'w-32 h-32',
    };

    const loader = (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className={`${sizes[size]} relative`}>
                {/* Outer orbiting dots */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-secondary to-primary"></div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-secondary to-primary"></div>
                </div>

                {/* Middle ring with reverse spin */}
                <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-primary border-r-secondary animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>

                {/* Inner pulsing circle */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 animate-pulse"></div>

                {/* Center logo mark */}
                <div className="absolute inset-[35%] flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-full h-full animate-pulse">
                        <defs>
                            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" className="text-primary" stopColor="currentColor" />
                                <stop offset="100%" className="text-secondary" stopColor="currentColor" />
                            </linearGradient>
                        </defs>
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
                            fill="url(#logoGradient)"
                            opacity="0.8" />
                    </svg>
                </div>
            </div>
            {text && (
                <p className="text-gray-600 font-medium animate-pulse">
                    {text}
                </p>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white/90 p-10 rounded-3xl shadow-2xl border border-gray-100">
                    {loader}
                </div>
            </div>
        );
    }

    return loader;
};

export default Loader;

