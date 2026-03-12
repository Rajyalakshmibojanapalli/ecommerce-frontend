import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export default function Pagination({ pagination, onPageChange }) {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { currentPage, totalPages } = pagination;
  const pages = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}
        className="p-2 rounded-lg bg-dark-light border border-dark-border text-gray-400 
          hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer">
        <HiChevronLeft className="w-5 h-5" />
      </button>
      {pages.map((page) => (
        <button key={page} onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg font-medium transition cursor-pointer
            ${page === currentPage
              ? "bg-primary text-black"
              : "bg-dark-light border border-dark-border text-gray-400 hover:text-white"}`}>
          {page}
        </button>
      ))}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}
        className="p-2 rounded-lg bg-dark-light border border-dark-border text-gray-400 
          hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer">
        <HiChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}