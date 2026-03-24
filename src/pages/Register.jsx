import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getRegisterSchema } from "@/schemas/authSchema";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { LanguageContext } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UserPlus, Mail, Lock, User, Loader2, MapPin } from "lucide-react";
import toast from 'react-hot-toast';
import logo from '@/assets/logo/logo.png';

export default function Register() {
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(getRegisterSchema(language)),
  });

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); 

      useAuthStore.getState().registerUser({
      name: data.name,
      email: data.email,
      password: data.password, 
      address: data.address,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`
    });

      toast.success(language === "EN" ? "Account created successfully!" : "تم إنشاء الحساب بنجاح!");
      navigate("/login");
    } catch (error) {
      toast.error( language === "EN" ? "Account created Failed!" : "حدث خطأ أثناء التسجيل" );
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${theme === "dark" ? "bg-[#121212]" : "bg-gray-50/50"
      }`}>
      <Card className={`w-full max-w-md shadow-2xl border-none rounded-[2rem] overflow-hidden ${theme === "dark" ? "bg-[#1E1E1E] text-white" : "bg-white"
        }`}>
        <CardHeader className="space-y-1 flex flex-col items-center text-center pb-2">
          <div className="w-16 h-16 mb-2 rounded-2xl bg-primary/10 flex items-center justify-center p-2">
            <img src={logo} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <CardTitle className="text-2xl font-black italic">
            {language === "EN" ? "Create Account" : "إنشاء حساب"}
          </CardTitle>
          <CardDescription className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
            {language === "EN" ? "Join our community today" : "انضم إلى مجتمعنا اليوم"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            {/* Name */}
            <div className="grid gap-1">
              <Label className="text-xs font-bold ml-1">{language === "EN" ? "Full Name" : "الاسم بالكامل"}</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={18} />
                <Input {...register("name")} placeholder="user name" className="pl-10 rounded-xl h-11" />
              </div>
              {errors.name && <p className="text-red-500 text-[10px]">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="grid gap-1">
              <Label className="text-xs font-bold ml-1">{language === "EN" ? "Email" : "البريد الإلكتروني"}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                <Input {...register("email")} type="email" placeholder="name@example.com" className="pl-10 rounded-xl h-11" />
              </div>
              {errors.email && <p className="text-red-500 text-[10px]">{errors.email.message}</p>}
            </div>

            <div className="grid gap-1">
              <Label className="text-xs font-bold ml-1">
                {language === "EN" ? "Location" : "الموقع / العنوان"}
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                <Input
                  {...register("address")}
                  placeholder={language === "EN" ? "City, Country" : "المدينة، الدولة"}
                  className={`pl-10 rounded-xl h-11 ${errors.address ? "border-red-500" : ""}`}
                />
              </div>
              {errors.address && <p className="text-red-500 text-[10px]">{errors.address.message}</p>}
            </div>

            {/* Password */}
            <div className="grid gap-1">
              <Label className="text-xs font-bold ml-1">{language === "EN" ? "Password" : "كلمة المرور"}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                <Input {...register("password")} type="password" placeholder="••••••••" className="pl-10 rounded-xl h-11" />
              </div>
              {errors.password && <p className="text-red-500 text-[10px]">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div className="grid gap-1">
              <Label className="text-xs font-bold ml-1">{language === "EN" ? "Confirm" : "تأكيد كلمة المرور"}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                <Input {...register("confirmPassword")} type="password" placeholder="••••••••" className="pl-10 rounded-xl h-11" />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-[10px]">{errors.confirmPassword.message}</p>}
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl mt-2">
              {isSubmitting ? <Loader2 className="animate-spin" /> : (
                <><UserPlus className="mr-2" size={18} /> {language === "EN" ? "Sign Up" : "تسجيل"}</>
              )}
            </Button>
          </form>
        </CardContent>

        <div className="p-6 pt-0 text-center">
          <p className="text-sm text-gray-500">
            {language === "EN" ? "Already have an account?" : "لديك حساب بالفعل؟"}{" "}
            <Link to="/login" className="text-primary font-bold hover:underline">
              {language === "EN" ? "Login" : "دخول"}
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}