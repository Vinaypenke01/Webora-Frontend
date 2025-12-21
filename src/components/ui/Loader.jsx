const Loader = ({ size = 'md', fullScreen = false }) => {
    const sizes = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
    };

    const loader = (
        <div className="flex items-center justify-center">
            <div className={`${sizes[size]} relative`}>
                <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-secondary animate-spin"></div>
            </div>
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
                {loader}
            </div>
        );
    }

    return loader;
};

export default Loader;
