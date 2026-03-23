import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { LanguageContext } from "@/context/LanguageContext";
import { WishlistContext } from "@/context/WishlistContext";
import { Button } from "@/components/ui/button";
import {
    ShoppingCart, User, Package, Sun, Moon,
    Languages, LogIn, Menu, Heart, Home
} from "lucide-react";
import logoNav from '@/assets/logo/logoNav.png';

import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet";

export default function Navbar() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { language, toggleLanguage } = useContext(LanguageContext);
    const { wishlist } = useContext(WishlistContext);
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { to: "/", icon: <Home size={20} />, label: language === "EN" ? "Home" : "الرئيسية" },
        { to: "/wishlist", icon: <Heart size={20} />, label: language === "EN" ? "Wishlist" : "المفضلة", badge: wishlist.length },
        { to: "/cart", icon: <ShoppingCart size={20} />, label: language === "EN" ? "Cart" : "السلة" },
        { to: "/orders", icon: <Package size={20} />, label: language === "EN" ? "Orders" : "طلباتي" },
        { to: "/profile", icon: <User size={20} />, label: language === "EN" ? "Profile" : "حسابي" },
    ];

    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
            isActive
                ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                : theme === "dark"
                    ? "text-gray-400 hover:bg-white/5 hover:text-accent"
                    : "text-gray-600 hover:bg-secondary/20 hover:text-primary"
        }`;

    return (
        <nav className={`flex justify-between items-center p-4 sticky top-0 z-50 shadow-sm border-b transition-colors duration-300 ${
            theme === "dark" ? "bg-[#1E1E1E] border-white/10" : "bg-white border-gray-100"
        }`}>

            <Link to="/" className="flex items-center gap-2 group shrink-0">
                <div className="w-24 h-10 overflow-hidden rounded-xl bg-secondary/10 flex items-center justify-center group-hover:rotate-3 transition-transform">
                    <img src={logoNav} alt="Toko" className="w-full h-full object-contain p-1" />
                </div>
            </Link>

            <div className="hidden lg:flex gap-2 items-center">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) => `
                            relative p-3 rounded-full transition-all duration-300 group
                            ${isActive 
                                ? "bg-primary/10 text-primary" 
                                : "text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5"}
                        `}
                        title={link.label} 
                    >
                        <span className="group-hover:scale-110 transition-transform block">
                            {link.icon}
                        </span>

                        {link.badge > 0 && (
                            <span className="absolute top-1 right-1 bg-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-[#1E1E1E] animate-in zoom-in">
                                {link.badge}
                            </span>
                        )}
                    </NavLink>
                ))}
            </div>

            <div className="flex gap-2 items-center">
                <div className="hidden lg:flex gap-2 border-l pl-2 border-gray-100 dark:border-white/5">
                    <Button variant="ghost" size="icon" onClick={toggleLanguage} className="hover:text-accent rounded-full">
                        <Languages size={20} />
                    </Button>

                    <Button variant="ghost" size="icon" onClick={toggleTheme} className="hover:text-secondary rounded-full">
                        {theme === "dark" ? <Sun size={20} className="text-secondary" /> : <Moon size={20} className="text-gray-600" />}
                    </Button>

                    <NavLink to="/login">
                        <Button size="icon" className="bg-accent hover:bg-accent/90 text-white rounded-full shadow-md shadow-accent/20">
                            <LogIn size={18} />
                        </Button>
                    </NavLink>
                </div>

                <div className="lg:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-white/5 outline-none">
                            <Menu size={24} />
                        </SheetTrigger>

                        <SheetContent
                            side={language === "EN" ? "right" : "left"}
                            className={`w-75 flex flex-col p-6 transition-colors duration-300 ${
                                theme === 'dark' ? 'bg-[#1E1E1E] border-gray-800' : 'bg-white border-gray-100'
                            }`}
                        >
                            <SheetTitle className="mb-6">
                                <img src={logoNav} alt="Logo" className="h-10 w-auto" />
                            </SheetTitle>

                            <div className="flex flex-col gap-2 grow overflow-y-auto">
                                {navLinks.map((link) => (
                                    <NavLink
                                        key={link.to}
                                        to={link.to}
                                        onClick={() => setIsOpen(false)}
                                        className={navLinkClass}
                                    >
                                        <span className={theme === 'dark' ? 'text-accent' : 'text-primary'}>
                                            {link.icon}
                                        </span>
                                        <span className="text-lg grow">{link.label}</span>
                                        {link.badge > 0 && (
                                            <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                                                {link.badge}
                                            </span>
                                        )}
                                    </NavLink>
                                ))}
                            </div>

                            <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-4">
                                <div className="flex gap-2">
                                    <Button variant="outline" className="flex-1 gap-2 rounded-xl h-12 text-xs" onClick={toggleLanguage}>
                                        <Languages size={18} /> {language === "EN" ? "Arabic" : "English"}
                                    </Button>
                                    <Button variant="outline" className="flex-1 gap-2 rounded-xl h-12 text-xs" onClick={toggleTheme}>
                                        {theme === "dark" ? <Sun size={18} className="text-secondary" /> : <Moon size={18} />} {theme === "dark" ? "Light" : "Dark"}
                                    </Button>
                                </div>
                                <NavLink to="/login" onClick={() => setIsOpen(false)}>
                                    <Button className="w-full bg-accent hover:bg-accent/90 text-white font-bold h-14 rounded-xl">
                                        <LogIn size={20} className="mr-2" /> {language === "EN" ? "Login" : "تسجيل الدخول"}
                                    </Button>
                                </NavLink>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}