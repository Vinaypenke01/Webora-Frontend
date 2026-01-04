const Loader = ({ size = 'md', fullScreen = false, text = '' }) => {
    const sizes = {
        sm: 'w-8 h-8',
        md: 'w-16 h-16',
        lg: 'w-24 h-24',
    };

    const loader = (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className={`${sizes[size]} relative`}>
                {/* Outer Ring */}
                <div className="absolute inset-0 rounded-full border-4 border-primary/10"></div>
                
                {/* Spinning Gradient Ring */}
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-l-secondary animate-spin shadow-lg"></div>
                
                {/* Inner Pulse Ring */}
                <div className="absolute inset-2 rounded-full border-2 border-secondary/20 animate-pulse"></div>
                
                {/* Center Dot */}
                <div className="absolute inset-[40%] rounded-full bg-primary/40 animate-ping"></div>
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
            <div className="fixed inset-0 bg-white/40 backdrop-blur-md flex items-center justify-center z-50">
                <div className="bg-white/60 p-8 rounded-3xl shadow-2xl border border-white/20">
                    {loader}
                </div>
            </div>
        );
    }

    return loader;
};

export default Loader;
