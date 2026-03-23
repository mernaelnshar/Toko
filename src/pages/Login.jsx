import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "@/context/ThemeContext";
import { LanguageContext } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LogIn, Mail, Lock } from "lucide-react";
import logo from '@/assets/logo/logo.png';

export default function Login() {
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
      theme === "dark" ? "bg-[#121212]" : "bg-gray-50/50"
    }`}>
      <Card className={`w-full max-w-md shadow-xl border-none ${
        theme === "dark" ? "bg-[#1E1E1E] text-white" : "bg-white"
      }`}>
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="w-20 h-20 mb-4 rounded-2xl bg-secondary/10 flex items-center justify-center p-2">
            <img src={logo} alt="Toko" className="w-full h-full object-contain" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            {language === "EN" ? "Welcome Back" : "مرحباً بك مجدداً"}
          </CardTitle>
          <CardDescription className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
            {language === "EN" ? "Enter your credentials to access your account" : "أدخل بياناتك للوصول إلى حسابك"}
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2 text-left">
              <Label htmlFor="email" className={language === "AR" ? "text-right" : ""}>
                {language === "EN" ? "Email" : "البريد الإلكتروني"}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  className={`pl-10 rounded-xl h-11 border-gray-200 dark:border-gray-800 ${theme === 'dark' ? 'bg-[#121212]' : 'bg-white'}`}
                  required 
                />
              </div>
            </div>

            <div className="grid gap-2 text-left">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className={language === "AR" ? "order-2" : ""}>
                  {language === "EN" ? "Password" : "كلمة المرور"}
                </Label>
                <Link to="#" className="text-xs text-primary hover:underline font-medium order-1">
                  {language === "EN" ? "Forgot password?" : "نسيت كلمة المرور؟"}
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                <Input 
                  id="password" 
                  type="password" 
                  className={`pl-10 rounded-xl h-11 border-gray-200 dark:border-gray-800 ${theme === 'dark' ? 'bg-[#121212]' : 'bg-white'}`}
                  required 
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-11 bg-accent hover:bg-accent/90 text-white font-bold rounded-xl shadow-lg shadow-accent/20"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="mr-2" size={18} />
                  {language === "EN" ? "Login" : "تسجيل الدخول"}
                </>
              )}
            </Button>
          </form>
        </CardContent>

        
      </Card>
    </div>
  );
}