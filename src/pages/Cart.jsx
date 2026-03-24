import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { ThemeContext } from "@/context/ThemeContext";
import { LanguageContext } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const handleRemove = (id, title) => {
    removeFromCart(id);
    toast.error(language === "EN" ? `${title} removed` : `تم حذف ${title}`);
  };

  if (cart.length === 0) {
    return (
      <div className={`min-h-[80vh] flex flex-col items-center justify-center gap-6 px-6 ${
        theme === "dark" ? "bg-[#121212] text-white" : "bg-white text-gray-900"
      }`}>
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
          <ShoppingBag size={48} className="text-primary" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black">{language === "EN" ? "Your cart is empty" : "سلة التسوق فارغة"}</h2>
          <p className="text-gray-500">{language === "EN" ? "Looks like you haven't added anything yet." : "يبدو أنك لم تضف أي شيء بعد."}</p>
        </div>
        <Link to="/">
          <Button className="rounded-full px-8 h-12 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 font-bold">
            {language === "EN" ? "Explore Products" : "استكشف المنتجات"}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-12 px-6 transition-colors duration-500 ${
      theme === "dark" ? "bg-[#121212] text-white" : "bg-white text-gray-900"
    }`}>
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black tracking-tight italic">
            {language === "EN" ? "My Shopping Bag" : "حقيبة التسوق"}
            <span className="text-primary text-sm font-medium ml-4 opacity-50">({cartCount} items)</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* قائمة المنتجات */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div 
                key={item.id} 
                className={`flex flex-col sm:flex-row items-center gap-6 p-6 rounded-[2.5rem] transition-all border ${
                  theme === "dark" ? "bg-[#1E1E1E] border-white/5" : "bg-gray-50 border-gray-100"
                }`}
              >
                {/* الصورة */}
                <div className="w-32 h-32 bg-white rounded-[1.5rem] p-4 shrink-0 shadow-sm flex items-center justify-center">
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain" />
                </div>

                {/* بيانات المنتج */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-lg leading-tight mb-1">{item.title}</h3>
                  <p className="text-primary font-black mb-4">${item.price}</p>
                  
                  {/* التحكم في الكمية */}
                  <div className="flex items-center justify-center sm:justify-start gap-4">
                    <div className="flex items-center gap-4 bg-white/5 dark:bg-black/20 rounded-2xl p-1.5 border border-gray-200 dark:border-white/5">
                      <Button 
                        variant="ghost" size="icon" className="h-8 w-8 rounded-xl hover:bg-primary hover:text-white transition-colors"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <Minus size={14} />
                      </Button>
                      <span className="font-bold text-sm min-w-5text-center">{item.quantity}</span>
                      <Button 
                        variant="ghost" size="icon" className="h-8 w-8 rounded-xl hover:bg-primary hover:text-white transition-colors"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus size={14} />
                      </Button>
                    </div>
                    
                    <Button 
                      variant="ghost" size="icon" 
                      className="text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl"
                      onClick={() => handleRemove(item.id, item.title)}
                    >
                      <Trash2 size={20} />
                    </Button>
                  </div>
                </div>

                {/* السعر النهائي للمنتج الواحد */}
                <div className="hidden sm:block text-right min-w-25">
                  <p className="font-black text-xl text-accent">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/*(Order Summary) */}
          <aside className="lg:col-span-1">
            <div className={`p-8 rounded-[3rem] sticky top-28 border ${
              theme === "dark" ? "bg-[#1E1E1E] border-white/5 shadow-2xl shadow-black/50" : "bg-white border-gray-100 shadow-xl shadow-gray-200/50"
            }`}>
              <h2 className="text-2xl font-black mb-6">{language === "EN" ? "Order Summary" : "ملخص الطلب"}</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>{language === "EN" ? "Subtotal" : "المجموع الفرعي"}</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>{language === "EN" ? "Estimated Shipping" : "الشحن التقديري"}</span>
                  <span className="text-green-500 font-bold">{language === "EN" ? "FREE" : "مجاني"}</span>
                </div>
                <div className="h-px bg-gray-100 dark:bg-white/5 my-4" />
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-bold">{language === "EN" ? "Total Price" : "السعر الإجمالي"}</span>
                  <span className="text-3xl font-black text-primary">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <Link to="/checkout">
                <Button className="w-full h-16 rounded-[1.5rem] bg-primary hover:bg-primary/90 text-white font-black text-lg gap-3 shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95">
                  {language === "EN" ? "Proceed to Checkout" : "الذهاب لإتمام الدفع"}
                  <ArrowRight size={22} />
                </Button>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}