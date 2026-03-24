import { createContext, useState, useEffect , useContext } from "react";
import toast from 'react-hot-toast';
export const WishlistContext = createContext();
import { LanguageContext } from "@/context/LanguageContext";

export const WishlistProvider = ({ children }) => {
    const { language } = useContext(LanguageContext);
    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem("wishlist");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const toggleWishlist = (product) => {
    const isExist = wishlist.find((item) => item.id === product.id);

    if (isExist) {
        setWishlist((prev) => prev.filter((item) => item.id !== product.id));
        toast.error(
            language === "EN" ? "Removed from Wishlist" : "تم الحذف من المفضلة",
            { icon: '💔' } 
        );
    } else {
        setWishlist((prev) => [...prev, product]);
        toast.success(
            language === "EN"
                ? `${product.title} added to Wishlist`
                : `تم إضافة ${product.title} للمفضلة!`,
            {
                icon: '❤️',
                style: {
                    border: '1px solid #ff4b2b',
                    padding: '16px',
                    color: '#ff4b2b',
                    backgroundColor: '#fff',
                    fontWeight: 'bold'
                }
            }
        );
    }
};

    const isInWishlist = (productId) => {
        return wishlist.some((item) => item.id === productId);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};