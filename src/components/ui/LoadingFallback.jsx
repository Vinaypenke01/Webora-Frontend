
import { FaSpinner } from 'react-icons/fa';

const LoadingFallback = () => {
    return (
        <div className="flex items-center justify-center min-h-[60vh] w-full">
            <div className="flex flex-col items-center gap-4">
                <FaSpinner className="text-4xl text-primary animate-spin" />
                <p className="text-gray-500 font-medium">Loading...</p>
            </div>
        </div>
    );
};

export default LoadingFallback;
