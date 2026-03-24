import { useContext, useState } from "react";
import { CartContext } from "@/context/CartContext";
import { ThemeContext } from "@/context/ThemeContext";
import { LanguageContext } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Truck, MapPin, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart , clearCart , cartTotal } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      toast.success(
        language === "EN" ? "Order placed successfully!" : "تم تسجيل طلبك بنجاح!",
        { icon: '🎉', duration: 5000 }
      );
      clearCart();
      navigate("/orders"); 
    }, 2000);
  };

  return (
    <div className={`min-h-screen py-12 px-6 transition-colors duration-500 ${
      theme === "dark" ? "bg-[#121212] text-white" : "bg-white text-gray-900"
    }`}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black mb-10 flex items-center gap-3">
          <ShieldCheck className="text-primary" size={36} />
          {language === "EN" ? "Secure Checkout" : "إتمام الدفع الآمن"}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* الجانب الأيسر: الفورم */}
          <form onSubmit={handlePlaceOrder} className="space-y-10">
            
            {/* قسم الشحن */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b pb-2 border-gray-100 dark:border-white/5">
                <MapPin size={20} className="text-primary" />
                <h2 className="text-xl font-bold">{language === "EN" ? "Shipping Address" : "عنوان الشحن"}</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{language === "EN" ? "First Name" : "الاسم الأول"}</Label>
                  <Input required className="rounded-xl h-12" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label>{language === "EN" ? "Last Name" : "الاسم الأخير"}</Label>
                  <Input required className="rounded-xl h-12" placeholder="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>{language === "EN" ? "Full Address" : "العنوان بالتفصيل"}</Label>
                <Input required className="rounded-xl h-12" placeholder="Street, Building, Apartment" />
              </div>
            </div>

            {/* قسم الدفع */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b pb-2 border-gray-100 dark:border-white/5">
                <CreditCard size={20} className="text-primary" />
                <h2 className="text-xl font-bold">{language === "EN" ? "Payment Method" : "طريقة الدفع"}</h2>
              </div>
              
              <div className={`p-4 rounded-2xl border-2 border-primary bg-primary/5 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary" />
                  <span className="font-bold">{language === "EN" ? "Cash on Delivery" : "الدفع عند الاستلام"}</span>
                </div>
                <Truck size={24} className="opacity-20" />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-xl shadow-xl shadow-primary/20 transition-all"
            >
              {loading 
                ? (language === "EN" ? "Processing..." : "جاري المعالجة...") 
                : (language === "EN" ? `Pay $${cartTotal.toFixed(2)}` : `تأكيد الدفع $${cartTotal.toFixed(2)}`)}
            </Button>
          </form>

          {/* الجانب الأيمن: مراجعة السلة */}
          <div className={`p-8 rounded-[3rem] h-fit border ${
            theme === "dark" ? "bg-[#1E1E1E] border-white/5" : "bg-gray-50 border-gray-100"
          }`}>
            <h2 className="text-2xl font-black mb-6">{language === "EN" ? "Order Review" : "مراجعة الطلب"}</h2>
            
            <div className="max-h-75 overflow-y-auto pr-2 space-y-4 no-scrollbar mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-xl p-2 shrink-0 border border-gray-100">
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm truncate">{item.title}</h4>
                    <p className="text-gray-500 text-xs">{item.quantity} x ${item.price}</p>
                  </div>
                  <span className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-white/10">
              <div className="flex justify-between text-gray-500">
                <span>{language === "EN" ? "Items Total" : "إجمالي المنتجات"}</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>{language === "EN" ? "Shipping" : "مصاريف الشحن"}</span>
                <span className="text-green-500 font-bold">{language === "EN" ? "FREE" : "مجاني"}</span>
              </div>
              <div className="flex justify-between text-2xl font-black mt-4">
                <span>{language === "EN" ? "Grand Total" : "الإجمالي النهائي"}</span>
                <span className="text-accent">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-500/10 rounded-2xl flex gap-3 items-center border border-yellow-500/20">
              <ShieldCheck size={20} className="text-yellow-600 shrink-0" />
              <p className="text-[10px] leading-tight text-yellow-700 dark:text-yellow-500">
                {language === "EN" 
                  ? "Your data is protected. By clicking confirm, you agree to our terms of service." 
                  : "بياناتك محمية بالكامل. بضغطك على تأكيد، أنت توافق على شروط الخدمة الخاصة بنا."}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}