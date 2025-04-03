import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Book } from "../types/Book";
import { deleteBook, fetchBooks } from "../api/BooksAPI";
import Pagination from "../components/Pagination";
import NewBookForm from "../components/NewBookForm";
import EditBookForm from "../components/EditBookForm";

const AdminBooksPage = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [showForm, setShowForm] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await fetchBooks(pageSize, pageNum, [], false);
                setBooks(data.books);
                setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, [pageSize, pageNum]);

    useEffect(() => {
        document.title = "Admin Books Page";
    }, []);

    const handleDelete = async (bookID: number) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this book?");
        if (!confirmDelete) return;

        try {
            await deleteBook(bookID);
            setBooks(books.filter((b) => b.bookID !== bookID));
        } catch (error) {
            alert("Failed to delete book. Please try again.");
        }
    };

    if (loading) return <p>Loading books...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="container mx-auto p-6">
            {/* Restored Header with Original Colors */}
            <div className="row bg-pink-200 text-white" style={{ backgroundColor: "#FF8A7A" }}>
            <h1>Admin Page</h1>
        </div>

            <br />

            {/* Add Book Button (Keeping Your Colors) */}
            {!showForm && (
                <button
                    className="mb-3"
                    style={{
                        backgroundColor: "#E6F7E6",
                        color: "black",
                        border: "1px solid #d1d5db",
                        transition: "background-color 0.3s ease",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#D4EED4")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#E6F7E6")}
                    onClick={() => setShowForm(true)}
                >
                    Add Book
                </button>
            )}

            {showForm && (
                <NewBookForm
                    onSuccess={() => {
                        setShowForm(false);
                        fetchBooks(pageSize, pageNum, [], false).then((data) => setBooks(data.books));
                    }}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {editingBook && (
                <EditBookForm
                    book={editingBook}
                    onSuccess={() => {
                        setEditingBook(null);
                        fetchBooks(pageSize, pageNum, [], false).then((data) => setBooks(data.books));
                    }}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {/* Table with Clear Line Separators */}
            <table className="w-full mt-4 border border-gray-300">
                <thead>
                    <tr className="bg-gray-100 border-b border-gray-400">
                        {["ID", "Title", "Author", "Publisher", "ISBN", "Classification", "Category", "Page Count", "Price", "Actions"].map((header) => (
                            <th key={header} className="px-4 py-2 border border-gray-400 font-semibold">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {books.map((b) => (
                        <tr key={b.bookID} className="border-b border-gray-300">
                            <td className="px-4 py-2 border border-gray-300">{b.bookID}</td>
                            <td className="px-4 py-2 border border-gray-300">{b.title}</td>
                            <td className="px-4 py-2 border border-gray-300">{b.author}</td>
                            <td className="px-4 py-2 border border-gray-300">{b.publisher}</td>
                            <td className="px-4 py-2 border border-gray-300">{b.isbn}</td>
                            <td className="px-4 py-2 border border-gray-300">{b.classification}</td>
                            <td className="px-4 py-2 border border-gray-300">{b.category}</td>
                            <td className="px-4 py-2 border border-gray-300">{b.pageCount}</td>
                            <td className="px-4 py-2 border border-gray-300">${b.price.toFixed(2)}</td>
                            <td className="px-4 py-2 border border-gray-300 flex gap-2">
                                {/* Edit Button (Keeping Your Colors) */}
                                <button
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
                                    onClick={() => setEditingBook(b)}
                                >
                                    Edit
                                </button>
                                {/* Delete Button (Keeping Your Colors) */}
                                <button
                                    style={{
                                        backgroundColor: "#FFECEC",
                                        color: "black",
                                        border: "1px solid #d1d5db",
                                        transition: "background-color 0.3s ease",
                                        padding: "8px 16px",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#FFDCDC")}
                                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#FFECEC")}
                                    onClick={() => handleDelete(b.bookID)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br></br>
            <button
            onClick={() => navigate('/books')}
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
            Book Store
        </button>

            {/* Pagination */}
            <Pagination
                currentPage={pageNum}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setPageNum}
                onPageSizeChange={(newSize) => {
                    setPageSize(newSize);
                    setPageNum(1);
                }}
            />
        </div>
    );
};

export default AdminBooksPage;
