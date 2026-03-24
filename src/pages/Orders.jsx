import { useContext, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { LanguageContext } from "@/context/LanguageContext";
import { CartContext } from "@/context/CartContext"; // 👈 تأكدي من الاستيراد صح
import { Button } from "@/components/ui/button";
import { Package, ChevronDown, Calendar, Truck, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function Orders() {
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const { orders } = useContext(CartContext); // 👈 بنقرأ الأوردرات الحقيقية
  
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleOrder = (id) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  // لو مفيش أوردرات لسه
  if (orders.length === 0) {
    return (
      <div className={`min-h-[80vh] flex flex-col items-center justify-center gap-6 ${theme === "dark" ? "bg-[#121212] text-white" : "bg-white text-gray-900"}`}>
        <ShoppingBag size={60} className="text-gray-300" />
        <p className="text-xl font-bold">{language === "EN" ? "No orders found" : "لا يوجد طلبات سابقة"}</p>
        <Link to="/"><Button>{language === "EN" ? "Go Shopping" : "اذهب للتسوق"}</Button></Link>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-16 px-6 transition-colors duration-500 ${
      theme === "dark" ? "bg-[#121212] text-white" : "bg-white text-gray-900"
    }`}>
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center sm:text-left">
          <h1 className="text-4xl font-black mb-2">{language === "EN" ? "My Orders" : "طلباتي"}</h1>
          <p className="text-gray-500 italic">{language === "EN" ? "Review your purchase history" : "راجع سجل مشترياتك السابقة"}</p>
        </header>

        <div className="space-y-6">
          {orders.map((order) => {
            const isExpanded = expandedOrderId === order.id;
            
            return (
              <div 
                key={order.id}
                className={`overflow-hidden rounded-[2.5rem] border transition-all duration-300 ${
                  isExpanded ? "ring-2 ring-primary shadow-2xl scale-[1.01]" : "hover:border-primary/50"
                } ${theme === "dark" ? "bg-[#1E1E1E] border-white/5" : "bg-gray-50 border-gray-100"}`}
              >
                {/* الجزء العلوي */}
                <div 
                  className="p-8 cursor-pointer flex flex-wrap justify-between items-center gap-6"
                  onClick={() => toggleOrder(order.id)}
                >
                  <div className="flex gap-6 items-center">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-primary/10 text-primary">
                      <Package size={28} />
                    </div>
                    <div>
                      <h3 className="font-black text-lg">{order.id}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <Calendar size={14} /> {order.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400">{language === "EN" ? "Total" : "الإجمالي"}</p>
                      <p className="font-black text-xl text-primary">${order.total.toFixed(2)}</p>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`rounded-full transition-transform duration-300 ${isExpanded ? "rotate-180 bg-primary text-white" : ""}`}
                    >
                      <ChevronDown size={20} />
                    </Button>
                  </div>
                </div>

                {/* الجزء المخفي (المنتجات) */}
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  isExpanded ? "max-h-250 opacity-100 border-t border-gray-100 dark:border-white/5" : "max-h-0 opacity-0"
                }`}>
                  <div className="p-8 space-y-6">
                    <h4 className="font-bold text-sm uppercase tracking-tighter text-gray-400">
                      {language === "EN" ? "Items in this order" : "المنتجات في هذا الطلب"}
                    </h4>
                    
                    {/* لاحظي هنا استخدمنا order.items و item.thumbnail */}
                    {order.items?.map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-white p-1 border border-gray-100 flex items-center justify-center">
                            <img src={item.thumbnail} className="max-h-full max-w-full object-contain" alt="" />
                          </div>
                          <div>
                            <p className="font-bold text-sm">{item.title}</p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}

                    <div className="pt-6 mt-6 border-t border-gray-100 dark:border-white/5 flex flex-wrap justify-between items-center gap-4">
                       <div className="flex items-center gap-2 text-xs font-bold text-green-500">
                          <Truck size={16} />
                          <span>Status: {order.status}</span>
                       </div>
                       <Button variant="outline" className="rounded-xl text-xs h-9">
                          {language === "EN" ? "Help Center" : "مركز المساعدة"}
                       </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}