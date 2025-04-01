import { useEffect, useState } from "react";
import { Book } from "../types/Book"; // Imports from the Types file
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Import Cart Context

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
    // State variables
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortByTitle, setSortByTitle] = useState<boolean>(false);
    const navigate = useNavigate();
    const { addToCart } = useCart(); // Get addToCart function from context

    useEffect(() => {
        const fetchBooks = async () => {
            const categoryParams = selectedCategories
                .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
                .join("&");

            const response = await fetch(
                `https://localhost:5000/api/Book/AllBooks?pageHowMany=${pageSize}&pageNum=${pageNum}&sortByTitleAsc=${sortByTitle}${
                    selectedCategories.length ? `&${categoryParams}` : ""
                }`,
                {
                    credentials: "include",
                }
            ); // Pulling data from the backend
            const data = await response.json();
            setBooks(data.books);
            setTotalPages(Math.ceil(data.totalNumBooks / pageSize)); // Fix calculation
        };
        fetchBooks();
    }, [pageSize, pageNum, sortByTitle, selectedCategories]); // Dependencies

    return (
        <>
            <div className="d-flex justify-content-center mt-3">
                <button
                    className="btn me-2"
                    style={{
                        backgroundColor: sortByTitle ? "#DCEEFF" : "transparent",
                        color: sortByTitle ? "black" : "#007BFF",
                        border: "1px solid #007BFF",
                        transition: "background-color 0.3s ease",
                    }}
                    onClick={() => {
                        setSortByTitle((prev) => !prev);
                        setPageNum(1); // Reset to first page when sorting changes
                    }}
                    onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#C7E0FF")
                    }
                    onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = sortByTitle ? "#DCEEFF" : "transparent")
                    }
                >
                    Sort by Title {sortByTitle ? "(A-Z)" : ""}
                </button>
            </div>

            <br />
            <br />
            {/* Goes through all of the variables for each book in the list */}
            {books.map((b) => (
                <div id="bookCard" className="card" key={b.bookID}>
                    <h3 className="card-title">{b.title}</h3>
                    <div className="card-body">
                        <ul className="list-unstyled">
                            <li><strong>Author:</strong> {b.author}</li>
                            <li><strong>Publisher:</strong> {b.publisher}</li>
                            <li><strong>ISBN:</strong> {b.isbn}</li>
                            <li><strong>Classification:</strong> {b.classification}</li>
                            <li><strong>Category:</strong> {b.category}</li>
                            <li><strong>Page Count:</strong> {b.pageCount}</li>
                            <li><strong>Price:</strong> ${b.price}</li>
                        </ul>

                        <button
                            className="btn"
                            onClick={() => {
                                addToCart({
                                    bookID: b.bookID,
                                    title: b.title,
                                    price: b.price,
                                    quantity: 0
                                }); // Add book to CartContext
                                navigate("/cart"); // Navigate to cart page
                            }}
                            style={{
                                backgroundColor: "#F0F8FF",
                                color: "black",
                                border: "1px solid #d1d5db",
                                transition: "background-color 0.3s ease",
                            }}
                            onMouseOver={(e) =>
                                (e.currentTarget.style.backgroundColor = "#E0EFFB")
                            }
                            onMouseOut={(e) =>
                                (e.currentTarget.style.backgroundColor = "#F0F8FF")
                            }
                        >
                            Add To Cart
                        </button>
                    </div>
                </div>
            ))}
            <br />
            <br />

            {/* Pagination */}
            <div className="d-flex justify-content-center mt-3">
                <button
                    className="btn btn-outline-primary me-2"
                    disabled={pageNum === 1}
                    onClick={() => setPageNum(pageNum - 1)}
                >
                    Previous
                </button>

                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        className={`btn ${pageNum === index + 1 ? "btn-primary" : "btn-outline-primary"} me-1`}
                        onClick={() => setPageNum(index + 1)}
                        disabled={pageNum === index + 1}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    className="btn btn-outline-primary ms-2"
                    disabled={pageNum === totalPages}
                    onClick={() => setPageNum(pageNum + 1)}
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
                        setPageSize(Number(p.target.value));
                        setPageNum(1);
                    }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </div>
        </>
    );
}

export default BookList;
