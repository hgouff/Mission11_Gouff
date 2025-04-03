import { useState, useEffect } from "react";
import WelcomeBand from "../components/WelcomeBand";
import CategoryFilter from "../components/CategoryFilter";
import CookieConsent from "react-cookie-consent";
import BookList from "../components/BookList";
import { Fingerprint } from "../Fingerprint";
import { useCart } from "../context/CartContext";
import { useNavigate, useParams } from "react-router-dom";
import { CartItem } from "../types/CartItem";
import CartSummary from "../components/CartSummary";

function BookPage() {
    const navigate = useNavigate();
    const { title, bookID, price } = useParams();
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const { addToCart } = useCart();

    useEffect(() => {
        document.title = "Book Page";
    }, []);

    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookID: Number(bookID),
            title: title || "No title found",
            price: Number(price),
            quantity: 0
        };
        addToCart(newItem);
        navigate('/cart');
    };

    return (
        <div className="container mt-4">
            <CartSummary />
            <WelcomeBand />

            {/* Show Book Details if a Book is Selected */}
            {bookID && title && price ? (
                <div className="book-details text-center mb-4">
                    <h2>{title}</h2>
                    <p><strong>Price:</strong> ${price}</p>

                    {/* Add to Cart Button */}
                    <button className="btn btn-primary me-2" onClick={handleAddToCart}>
                        Add To Cart
                    </button>

                    {/* Back to Books Button */}
                    <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                        Back to Books
                    </button>
                </div>
            ) : (
                // If no book is selected, show the full book list
                <div className="row">
                    <div className="col-md-3">
                        <CategoryFilter
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                        />
                    </div>
                    <div className="col-md-9">
                        <BookList selectedCategories={selectedCategories} />
                    </div>
                </div>
            )}

            <CookieConsent>
                This website uses cookies to enhance the user experience.
            </CookieConsent>
            <Fingerprint />
        </div>
    );
}

export default BookPage;