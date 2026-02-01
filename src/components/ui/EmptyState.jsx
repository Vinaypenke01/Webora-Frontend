import PropTypes from 'prop-types';
import { FaInbox } from 'react-icons/fa';
import Button from './Button';
import { Link } from 'react-router-dom';

const EmptyState = ({
    title = 'No Data Found',
    description = 'It looks like there is nothing here yet.',
    icon: Icon = FaInbox,
    actionLabel,
    actionLink,
    onAction,
    className = ''
}) => {
    return (
        <div className={`flex flex-col items-center justify-center py-12 px-4 text-center rounded-lg bg-gray-50 border-2 border-dashed border-gray-200 ${className}`}>
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Icon className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-500 max-w-md mb-6">{description}</p>

            {actionLabel && (
                actionLink ? (
                    <Link to={actionLink}>
                        <Button variant="primary" size="md">
                            {actionLabel}
                        </Button>
                    </Link>
                ) : onAction ? (
                    <Button variant="primary" size="md" onClick={onAction}>
                        {actionLabel}
                    </Button>
                ) : null
            )}
        </div>
    );
};

EmptyState.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.elementType,
    actionLabel: PropTypes.string,
    actionLink: PropTypes.string,
    onAction: PropTypes.func,
    className: PropTypes.string
};

export default EmptyState;
