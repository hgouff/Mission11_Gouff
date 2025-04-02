interface PaginationProps{
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newSize: number) => void;
}

const Pagination = ({currentPage, totalPages, pageSize, onPageChange, onPageSizeChange}: PaginationProps) =>{
    return (
        <div>
        <div className="d-flex justify-content-center mt-3">
        <button
            className="btn btn-outline-dark me-2"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
        >
            Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
            <button
                key={index + 1}
                className={`btn ${currentPage === index + 1 ? "btn-secondary" : "btn-outline-dark"} me-1`}
                onClick={() => onPageChange(index + 1)}
                disabled={currentPage === index + 1}
            >
                {index + 1}
            </button>
        ))}

        <button
            className="btn btn-outline-dark ms-2"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
        >
            Next
        </button>
    </div>

    <br />
    <br />
    <div className="form-group">
        <label className="me-2">Results per page:</label>
        <select
            className="form-select w-auto d-inline-block"
            value={pageSize}
            onChange={(p) => {
                onPageSizeChange(Number(p.target.value));
                onPageChange(1);
            }}
        >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
        </select>
    </div>
    </div> 
    );
}

export default Pagination