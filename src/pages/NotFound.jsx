import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { LanguageContext } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Ghost } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  return (
    <div className={`min-h-screen flex items-center justify-center px-6 transition-colors duration-500 ${
      theme === "dark" ? "bg-[#121212] text-white" : "bg-white text-gray-900"
    }`}>
      <div className="text-center max-w-lg">
        {/* 404 Number with Animation */}
        <div className="relative inline-block">
          <h1 className="text-[12rem] font-black leading-none opacity-5 select-none italic">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Ghost size={80} className="text-primary animate-bounce mb-4" />
          </div>
        </div>

        {/* Text Section */}
        <div className="space-y-4 -mt-8">
          <h2 className="text-3xl font-black italic">
            {language === "EN" ? "Lost in Space?" : "هل أنت تائه في الفضاء؟"}
          </h2>
          <p className={`text-lg opacity-60 max-w-md mx-auto leading-relaxed ${
            language === "AR" ? "font-medium" : ""
          }`}>
            {language === "EN" 
              ? "The page you are looking for doesn't exist or has been moved to another galaxy." 
              : "الصفحة التي تبحث عنها غير موجودة أو ربما انتقلت إلى مجرة أخرى."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            onClick={() => navigate("/")}
            className="w-full sm:w-auto h-12 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold gap-2 shadow-xl shadow-primary/20 transition-transform active:scale-95"
          >
            <Home size={18} />
            {language === "EN" ? "Back to Home" : "العودة للرئيسية"}
          </Button>
          
          <Button 
            variant="ghost"
            onClick={() => navigate(-1)} 
            className="w-full sm:w-auto h-12 px-8 rounded-2xl font-bold gap-2 border border-transparent hover:border-gray-200 dark:hover:border-white/10"
          >
            <ArrowLeft size={18} className={language === "AR" ? "rotate-180" : ""} />
            {language === "EN" ? "Go Back" : "رجوع للخلف"}
          </Button>
        </div>
      </div>
    </div>
  );
}