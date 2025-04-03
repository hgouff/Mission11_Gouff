import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import WelcomeBand from "../components/WelcomeBand";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem"; // Import the CartItem type
import CartSummary from "../components/CartSummary";

function CartPage() {
    const navigate = useNavigate();
    const { cart, removeFromCart } = useCart();

    useEffect(() => {
        document.title = "Cart Page";
    }, []);

    return (
        <>
        {/* calls the Cart summary and the welcom band */}
            <CartSummary />
            <WelcomeBand />
            <div className="container mt-4">
                <h2>Shopping Cart</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                            <th>Action</th> {/* Add a column for the remove button */}
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item: CartItem) => (
                            <tr key={item.bookID}>
                                <td>{item.title}</td>
                                <td>{item.quantity}</td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>${(item.price * item.quantity).toFixed(2)}</td>
                                <td>
                                    <button
                                        className="btn"
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
                                        onClick={() => removeFromCart(item.bookID)} // Trigger remove function
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h3>Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</h3>
                
                {/* Checkout Button */}
                <button
                className="btn mt-3"
                style={{
                    backgroundColor: "#E6F7E6", // Very light green
                    color: "black",
                    border: "1px solid #d1d5db",
                    transition: "background-color 0.3s ease",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    cursor: "pointer",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#D4EED4")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#E6F7E6")}
            >
                Checkout
            </button>

            </div>
            <br></br>

            {/* Continue Browsing Button with Styling */}
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
            Continue Browsing
        </button>

        </>
    );
}

export default CartPage;
