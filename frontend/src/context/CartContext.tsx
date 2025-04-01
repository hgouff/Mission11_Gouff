// Example CartContext
import React, { createContext, useContext, useState } from 'react';
import { CartItem } from '../types/CartItem';

interface CartContextProps {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (bookID: number) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (newItem: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.bookID === newItem.bookID);
            if (existingItem) {
                // If item already exists, update its quantity
                return prevCart.map(item =>
                    item.bookID === newItem.bookID
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            // If item doesn't exist, add a new item with quantity 1
            return [...prevCart, { ...newItem, quantity: 1 }];
        });
    };

    const removeFromCart = (bookID: number) => {
        setCart((prevCart) => {
            const itemToRemove = prevCart.find(item => item.bookID === bookID);
            if (itemToRemove && itemToRemove.quantity > 1) {
                // If item exists and quantity > 1, reduce the quantity
                return prevCart.map(item =>
                    item.bookID === bookID
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            }
            // If quantity is 1 or item doesn't exist, remove the item
            return prevCart.filter(item => item.bookID !== bookID);
        });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
