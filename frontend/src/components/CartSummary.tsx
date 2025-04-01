import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartSummary = () => {
    const navigate = useNavigate();
    const { cart } = useCart();
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div
            style={{
                position: 'fixed',
                top: '10px',
                right: '10px', //  Moves it to the right side
                background: '#f8f9fa',
                padding: '10px 15px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0px 2px 5px rgba(0,0,0,0.2)', // Fixed boxShadow
                fontSize: '16px',
                fontWeight: 'bold',
                gap: '10px', // Adds spacing between icon & total
                minWidth: '120px', //  Ensures a nice size
                justifyContent: 'center', //  Centers content
            }}
            onClick={() => navigate('/cart')}
        >
            🛒 <span>${totalAmount.toFixed(2)}</span>
        </div>
    );
};

export default CartSummary;
