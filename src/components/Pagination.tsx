import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Pagination.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, setCurrentPage }: PaginationProps) {
    const getPageNumbers = () => {
        const pages = [];
        // Show 2 pages before and 2 pages after current page
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        // Always show first page and ellipsis if needed
        if (startPage > 1) {
            pages.push(1);
            if (startPage > 2) pages.push('...');
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        // Always show last page and ellipsis if needed
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) pages.push('...');
            pages.push(totalPages);
        }

        return pages;
    };

    if (totalPages <= 1) return null; // Don't show pagination if there's only 1 page

    return (
        <div className="pagination">
            <button
                className="pagination-btn nav-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                aria-label="Previous page"
            >
                <FaChevronLeft size={14} />
                <span>Prev</span>
            </button>

            <div className="pagination-numbers">
                {getPageNumbers().map((page, index) => (
                    typeof page === 'number' ? (
                        <button
                            key={index}
                            className={`pagination-btn page-number ${currentPage === page ? 'active' : ''}`}
                            onClick={() => setCurrentPage(page)}
                            aria-label={`Page ${page}`}
                            aria-current={currentPage === page ? 'page' : undefined}
                        >
                            {page}
                        </button>
                    ) : (
                        <span key={index} className="pagination-dots">
                            {page}
                        </span>
                    )
                ))}
            </div>

            <button
                className="pagination-btn nav-btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                aria-label="Next page"
            >
                <span>Next</span>
                <FaChevronRight size={14} />
            </button>
        </div>
    );
}