interface pagenationInterface {
  curPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
const Pagination = ({
  curPage,
  totalPages,
  onPageChange,
}: pagenationInterface) => {
  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        disabled={curPage === 1}
        onClick={() => onPageChange(curPage - 1)}
      >
        ← Previous
      </button>

      <p className="pagination-info">
        Page {curPage} of {totalPages}
      </p>

      <button
        className="pagination-btn"
        disabled={curPage === totalPages}
        onClick={() => onPageChange(curPage + 1)}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
