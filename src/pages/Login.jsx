import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getLoginSchema } from "@/schemas/authSchema";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate, Link } from "react-router-dom";
import toast from 'react-hot-toast';
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { LanguageContext } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LogIn, Mail, Lock, Loader2 } from "lucide-react"; 
import logo from '@/assets/logo/logo.png';

export default function Login() {
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(getLoginSchema(language)),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const success = login(data.email, data.password);
      if (success) {
        toast.success(language === "EN" ? "Welcome back!" : "مرحباً بك مجدداً!");
        navigate("/profile");
      } else {
        toast.error(language === "EN" ? "Invalid email or password!" : "الايميل او الرقم السري خطأ!");
      }
    } catch (error) {
      toast.error(language === "EN" ? "Login failed" : "فشل تسجيل الدخول");
    }


  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${theme === "dark" ? "bg-[#121212]" : "bg-gray-50/50"
      }`}>
      <Card className={`w-full max-w-md shadow-xl border-none ${theme === "dark" ? "bg-[#1E1E1E] text-white" : "bg-white"
        }`}>
        <CardHeader className="space-y-1 flex flex-col items-center text-center">
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

        <CardContent>
          
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">

            {/* حقل البريد الإلكتروني */}
            <div className="grid gap-2 text-left">
              <Label htmlFor="email" className={language === "AR" ? "text-right" : ""}>
                {language === "EN" ? "Email" : "البريد الإلكتروني"}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                <Input
                  {...register("email")} 
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className={`pl-10 rounded-xl h-11 border-gray-200 dark:border-gray-800 ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
                    } ${theme === 'dark' ? 'bg-[#121212]' : 'bg-white'}`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 animate-in fade-in slide-in-from-top-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* حقل كلمة المرور */}
            <div className="grid gap-2 text-left">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className={language === "AR" ? "order-2" : ""}>
                  {language === "EN" ? "Password" : "كلمة المرور"}
                </Label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline font-medium order-1">
                  {language === "EN" ? "Forgot password?" : "نسيت كلمة المرور؟"}
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                <Input
                  {...register("password")} 
                  id="password"
                  type="password"
                  className={`pl-10 rounded-xl h-11 border-gray-200 dark:border-gray-800 ${errors.password ? "border-red-500 focus-visible:ring-red-500" : ""
                    } ${theme === 'dark' ? 'bg-[#121212]' : 'bg-white'}`}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 animate-in fade-in slide-in-from-top-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting} 
              className="w-full h-11 bg-accent hover:bg-accent/90 text-white font-bold rounded-xl shadow-lg shadow-accent/20 transition-all active:scale-[0.98]"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <LogIn className="mr-2" size={18} />
                  {language === "EN" ? "Login" : "تسجيل الدخول"}
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-2 border-t border-gray-100 dark:border-white/5 pt-6">
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            {language === "EN" ? "Don't have an account?" : "ليس لديك حساب؟"}
            <Link
              to="/register"
              className="ml-2 text-primary font-bold hover:underline underline-offset-4"
            >
              {language === "EN" ? "Create an account" : "إنشاء حساب جديد"}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}