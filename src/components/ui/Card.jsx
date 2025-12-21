const Card = ({
    children,
    className = '',
    hover = true,
    padding = true,
    ...props
}) => {
    const baseStyles = 'bg-white rounded-xl shadow-md transition-all duration-300';
    const hoverStyles = hover ? 'hover:shadow-xl hover:-translate-y-1' : '';
    const paddingStyles = padding ? 'p-6' : '';

    return (
        <div
            className={`${baseStyles} ${hoverStyles} ${paddingStyles} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
