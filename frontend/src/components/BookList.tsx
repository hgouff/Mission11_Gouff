import { useEffect, useState } from "react";
import { Book } from "../types/Book"; // Imports from the Types file
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Import Cart Context
import { fetchBooks } from "../api/BooksAPI";
import Pagination from "./Pagination";

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
    // State variables
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortByTitle, setSortByTitle] = useState<boolean>(false);
    const navigate = useNavigate();
    const { addToCart } = useCart(); // Get addToCart function from context
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBooks = async () => {
            try{
                setLoading(true);
                const data = await fetchBooks(pageSize, pageNum, selectedCategories, sortByTitle);
            


            setBooks(data.books);
            setTotalPages(Math.ceil(data.totalNumBooks / pageSize)); // Fix calculation
            }
            catch(error){
                setError((error as Error).message)
            }
            finally{
                setLoading(false);
            }
        };
        loadBooks();
    }, [pageSize, pageNum, sortByTitle, selectedCategories]); // Dependencies

    if (loading) return <p>loading projects...</p>
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <>
            <div className="d-flex justify-content-center mt-3">
    <button
        className="btn me-2"
        style={{
            backgroundColor: "#F0F8FF",
            color: "black",
            border: "1px solid #d1d5db",
            transition: "background-color 0.3s ease",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
        }}
        onClick={() => {
            setSortByTitle((prev) => !prev);
            setPageNum(1); // Reset to first page when sorting changes
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#E0EFFB")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#F0F8FF")}
    >
        Sort by Title {sortByTitle ? "(A-Z)" : ""}
    </button>

    <button
            className="btn me-2"
            onClick={() => navigate('/adminbooks')}
            style={{
                backgroundColor: "#F0F8FF",
                color: "black",
                border: "1px solid #d1d5db",
                transition: "background-color 0.3s ease",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#E0EFFB")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#F0F8FF")}
        >
            Admin Page
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
            
             <Pagination
            currentPage={pageNum}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setPageNum}
            onPageSizeChange={(newSize)=>{ 
                setPageSize(newSize);
                setPageNum(1);
            }}
            
                    />
            <br />
            <br />

            
        </>
    );
}

export default BookList;
