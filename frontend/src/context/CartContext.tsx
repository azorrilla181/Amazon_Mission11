
import { createContext, ReactNode, useContext, useState } from "react";
import { CartItem } from "../types/CartItem";

interface CartContextType {
    cart: CartItem[];
    addtoCart: (item: CartItem) => void;
    removeFromCart: (bookID: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children}: {children: ReactNode}) => {
    const[cart, setCart] = useState<CartItem[]>([]);

    const addtoCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((c) => c.bookID === item.bookID);
            const updatedCart = prevCart.map((c) => 
                c.bookID === item.bookID 
                    ? {...c, bookPrice: c.bookPrice + item.bookPrice} 
                    : c
        );

        return existingItem ? updatedCart : [...prevCart, item];
        });
    };
    const removeFromCart = (bookID: number) => {
        setCart((prevCart) => prevCart.filter((c) => c.bookID !== bookID));
    };

    const clearCart = () => {
        setCart(() => []);
    };

    return (
        <CartContext.Provider 
            value={{cart, addtoCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};