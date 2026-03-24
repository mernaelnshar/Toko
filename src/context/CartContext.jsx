import { createContext, useState, useEffect , useContext } from "react";
import toast from 'react-hot-toast';
import { LanguageContext } from "@/context/LanguageContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { language } = useContext(LanguageContext);
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prev) => {
            const isExist = prev.find((item) => item.id === product.id);
            toast.success(
                language === "EN"
                    ? `${product.title} added to cart!`
                    : `تم إضافة ${product.title} للسلة!`,
                {
                    icon: '🛒',
                    style: {
                        border: '1px solid #713200',
                        padding: '16px',
                        color: '#713200',
                        backgroundColor: '#fff',
                        fontWeight: 'bold'
                    },
                }
            );

            if (isExist) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, amount) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === productId
                    ? { ...item, quantity: Math.max(1, item.quantity + amount) }
                    : item
            )
        );
    };

    const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart"); 
};

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount , clearCart }}>
            {children}
        </CartContext.Provider>
    );
};