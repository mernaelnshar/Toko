import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { LanguageContext } from "@/context/LanguageContext";
import { Facebook, Instagram, Twitter, Github } from "lucide-react";
import logoNav from '@/assets/logo/logoNav.png';

export default function Footer() {
    const { theme } = useContext(ThemeContext);
    const { language } = useContext(LanguageContext);
    const year = new Date().getFullYear();

    return (
        <footer className={`mt-auto border-t transition-colors duration-300 ${
            theme === "dark" ? "bg-[#1A1A1A] border-white/5 text-gray-400" : "bg-gray-50 border-gray-100 text-gray-600"
        }`}>
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    
                    <div className="flex flex-col items-center md:items-start gap-3">
                        <Link to="/" className="shrink-0 grayscale hover:grayscale-0 transition-all duration-500">
                            <img src={logoNav} alt="Toko Logo" className="h-8 w-auto opacity-80 hover:opacity-100" />
                        </Link>
                        <p className="text-sm max-w-xs text-center md:text-left">
                            {language === "EN" 
                                ? "Your favorite destination for trendy shopping and amazing deals." 
                                : "وجهتك المفضلة للتسوق العصري وأفضل العروض الحصرية."}
                        </p>
                    </div>

                    <div className="flex gap-6 text-sm font-medium">
                        <Link to="/" className="hover:text-secondary transition-colors">
                            {language === "EN" ? "Home" : "الرئيسية"}
                        </Link>
                        <Link to="/about" className="hover:text-primary transition-colors">
                            {language === "EN" ? "About" : "عنا"}
                        </Link>
                        <Link to="/contact" className="hover:text-accent transition-colors">
                            {language === "EN" ? "Contact" : "اتصل بنا"}
                        </Link>
                        
                    </div>

                    <div className="flex gap-4">
                        {[Facebook, Instagram, Twitter, Github].map((Icon, index) => (
                            <a 
                                key={index} 
                                href="#" 
                                className={`p-2 rounded-full border transition-all duration-300 ${
                                    theme === 'dark' 
                                    ? 'border-white/10 hover:bg-white/5 hover:text-white' 
                                    : 'border-gray-200 hover:bg-white hover:shadow-sm hover:text-primary'
                                }`}
                            >
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>

                <hr className={`my-8 opacity-50 ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`} />

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p>© {year} Toko. All rights reserved.</p>
                    <div className="flex items-center gap-1">
                        Made with <span className="text-primary text-lg">♥</span> by 
                        <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}> Toko Team</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}