import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const Alert = ({
    type = 'info',
    message,
    dismissible = true,
    autoClose = false,
    duration = 5000,
    onClose
}) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (autoClose) {
            const timer = setTimeout(() => {
                handleClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [autoClose, duration]);

    const handleClose = () => {
        setVisible(false);
        if (onClose) onClose();
    };

    if (!visible) return null;

    const types = {
        success: {
            bg: 'bg-green-50',
            border: 'border-green-500',
            text: 'text-green-800',
            icon: FaCheckCircle,
            iconColor: 'text-green-500',
        },
        error: {
            bg: 'bg-red-50',
            border: 'border-red-500',
            text: 'text-red-800',
            icon: FaExclamationCircle,
            iconColor: 'text-red-500',
        },
        warning: {
            bg: 'bg-yellow-50',
            border: 'border-yellow-500',
            text: 'text-yellow-800',
            icon: FaExclamationCircle,
            iconColor: 'text-yellow-500',
        },
        info: {
            bg: 'bg-blue-50',
            border: 'border-blue-500',
            text: 'text-blue-800',
            icon: FaInfoCircle,
            iconColor: 'text-blue-500',
        },
    };

    const config = types[type];
    const Icon = config.icon;

    return (
        <div className={`${config.bg} ${config.border} border-l-4 p-4 rounded-lg animate-slide-down`}>
            <div className="flex items-start">
                <Icon className={`${config.iconColor} text-xl mt-0.5 flex-shrink-0`} />
                <p className={`${config.text} ml-3 flex-1`}>{message}</p>
                {dismissible && (
                    <button
                        onClick={handleClose}
                        className={`${config.text} hover:opacity-70 ml-4 flex-shrink-0`}
                        aria-label="Close alert"
                    >
                        <FaTimes />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Alert;
