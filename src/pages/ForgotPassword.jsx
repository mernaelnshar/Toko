import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getForgotSchema } from "@/schemas/authSchema";
import { useAuthStore } from "@/store/useAuthStore";
import {  Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { LanguageContext } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const [isSent, setIsSent] = useState(false);
  const users = useAuthStore((state) => state.users);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(getForgotSchema(language)),
  });

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const userExists = users.find(u => u.email === data.email);

      if (userExists) {
        setIsSent(true);
        toast.success(language === "EN" ? "Reset link sent!" : "تم إرسال رابط الاستعادة!");
      } else {
        toast.error(language === "EN" ? "Email not found" : "هذا البريد غير مسجل لدينا");
      }
    } catch (error) {
      toast.error("Error");
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
      theme === "dark" ? "bg-[#121212]" : "bg-gray-50/50"
    }`}>
      <Card className={`w-full max-w-md shadow-xl border-none rounded-[2rem] ${
        theme === "dark" ? "bg-[#1E1E1E] text-white" : "bg-white"
      }`}>
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-black">
            {language === "EN" ? "Reset Password" : "استعادة كلمة المرور"}
          </CardTitle>
          <CardDescription className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
            {!isSent 
              ? (language === "EN" ? "Enter your email to receive a reset link" : "أدخل بريدك الإلكتروني لإرسال رابط استعادة كلمة المرور")
              : (language === "EN" ? "Check your inbox for further instructions" : "افحص بريدك الإلكتروني للحصول على التعليمات")}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!isSent ? (
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
              <div className="grid gap-2 text-left">
                <Label htmlFor="email" className={language === "AR" ? "text-right" : ""}>
                  {language === "EN" ? "Email Address" : "البريد الإلكتروني"}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                  <Input
                    {...register("email")}
                    id="email"
                    placeholder="name@example.com"
                    className="pl-10 rounded-xl h-12"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : (language === "EN" ? "Send Reset Link" : "إرسال الرابط")}
              </Button>
            </form>
          ) : (
            <div className="flex flex-col items-center py-6 animate-in zoom-in-95">
              <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={32} />
              </div>
              <p className="font-medium text-center italic">
                {language === "EN" ? "Reset instructions sent to your email!" : "تم إرسال تعليمات الاستعادة لبريدك!"}
              </p>
              <Button 
                variant="outline" 
                onClick={() => setIsSent(false)} 
                className="mt-6 rounded-xl"
              >
                {language === "EN" ? "Resend?" : "إعادة إرسال؟"}
              </Button>
            </div>
          )}
        </CardContent>

        <CardFooter className="justify-center border-t border-gray-100 dark:border-white/5 pt-6">
          <Link 
            to="/login" 
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors font-medium"
          >
            <ArrowLeft size={16} className={language === "AR" ? "rotate-180" : ""} />
            {language === "EN" ? "Back to Login" : "العودة لتسجيل الدخول"}
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}