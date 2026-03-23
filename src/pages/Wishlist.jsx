import { useContext } from "react";
import { WishlistContext } from "@/context/WishlistContext";
import { ThemeContext } from "@/context/ThemeContext";
import { LanguageContext } from "@/context/LanguageContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Wishlist() {
    const { wishlist, toggleWishlist } = useContext(WishlistContext);
    const { theme } = useContext(ThemeContext);
    const { language } = useContext(LanguageContext);

    if (wishlist.length === 0) {
        return (
            <div className={`min-h-[80vh] flex flex-col items-center justify-center gap-6 px-6 transition-colors ${theme === "dark" ? "bg-[#121212] text-white" : "bg-white text-gray-900"
                }`}>
                <div className="w-24 h-24 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center animate-bounce">
                    <Heart size={48} className="text-gray-400" />
                </div>
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-black">
                        {language === "EN" ? "Your wishlist is empty" : "قائمة أمنياتك فارغة"}
                    </h2>
                    <p className="text-gray-500 max-w-xs">
                        {language === "EN"
                            ? "Looks like you haven't added anything yet. Start exploring now!"
                            : "يبدو أنك لم تضف أي شيء بعد. ابدأ بالاستكشاف الآن!"}
                    </p>
                </div>
                <Link to="/">
                    <Button className="rounded-full px-8 h-12 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                        {language === "EN" ? "Back to Shop" : "العودة للتسوق"}
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className={`min-h-screen py-10 px-6 transition-colors ${theme === "dark" ? "bg-[#121212] text-white" : "bg-white text-gray-900"
            }`}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-4xl font-black tracking-tight">
                            {language === "EN" ? "My Wishlist" : "قائمة أمنياتي"}
                        </h1>
                        <p className="text-gray-500 font-medium">
                            {wishlist.length} {language === "EN" ? "Items Saved" : "منتجات محفوظة"}
                        </p>
                    </div>
                    <Link to="/">
                        <Button variant="ghost" className="rounded-full gap-2">
                            <ArrowLeft size={18} />
                            {language === "EN" ? "Continue Shopping" : "متابعة التسوق"}
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {wishlist.map((product) => (
                        <Card
                            key={product.id}
                            className={`group relative border-none overflow-hidden rounded-[2.5rem] transition-all duration-500 hover:shadow-2xl ${theme === 'dark' ? 'bg-[#1E1E1E]' : 'bg-gray-50'
                                }`}
                        >
                            <CardContent className="p-0 relative">
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => toggleWishlist(product)}
                                    className="absolute top-4 left-4 z-20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg scale-75 group-hover:scale-100"
                                >
                                    <Trash2 size={18} />
                                </Button>

                                <div className={`p-6 aspect-square flex items-center justify-center transition-colors duration-500 ${theme === 'dark' ? 'bg-white/5' : 'bg-white'}`}>
                                    <img src={product.thumbnail} alt={product.title} className="w-full h-full object-contain" />
                                </div>
                            </CardContent>

                            <CardFooter className="flex flex-col items-start p-6 gap-4">
                                <div className="space-y-1 w-full text-left">
                                    <span className="text-[10px] uppercase tracking-widest text-primary font-bold opacity-80">{product.category}</span>
                                    <h3 className="font-bold text-base truncate">{product.title}</h3>
                                </div>

                                <div className="flex justify-between items-center w-full">
                                    <span className="text-2xl font-black text-accent">${product.price}</span>
                                    <Button size="icon" className="h-12 w-12 rounded-[1.2rem] bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30 active:scale-90 transition-all">
                                        <ShoppingCart size={20} />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}