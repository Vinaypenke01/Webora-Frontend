import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    maxVisible = 5
}) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        const halfVisible = Math.floor(maxVisible / 2);

        let startPage = Math.max(1, currentPage - halfVisible);
        let endPage = Math.min(totalPages, currentPage + halfVisible);

        // Adjust if we're near the start or end
        if (currentPage <= halfVisible) {
            endPage = Math.min(totalPages, maxVisible);
        }
        if (currentPage >= totalPages - halfVisible) {
            startPage = Math.max(1, totalPages - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pages = getPageNumbers();

    return (
        <div className="flex items-center justify-center space-x-2">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
            >
                <FaChevronLeft />
            </button>

            {/* First page */}
            {pages[0] > 1 && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                        1
                    </button>
                    {pages[0] > 2 && <span className="px-2">...</span>}
                </>
            )}

            {/* Page numbers */}
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${currentPage === page
                            ? 'bg-primary text-white border-primary'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                >
                    {page}
                </button>
            ))}

            {/* Last page */}
            {pages[pages.length - 1] < totalPages && (
                <>
                    {pages[pages.length - 1] < totalPages - 1 && <span className="px-2">...</span>}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                        {totalPages}
                    </button>
                </>
            )}

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
            >
                <FaChevronRight />
            </button>
        </div>
    );
};

export default Pagination;
