import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "@/context/ThemeContext";
import { LanguageContext } from "@/context/LanguageContext";
import { WishlistContext } from "@/context/WishlistContext";
import { CartContext } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ShoppingCart, Star, ArrowLeft, Heart, 
  ShieldCheck, Truck, RefreshCw 
} from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(res.data);
        setActiveImage(res.data.thumbnail);
      } catch (err) {
        console.error("Error fetching product", err);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  if (loading) return <ProductSkeleton theme={theme} />;
  if (!product) return <div className="text-center py-20">Product not found</div>;

  return (
    <div className={`min-h-screen py-10 px-6 transition-colors duration-300 ${
      theme === "dark" ? "bg-[#121212] text-white" : "bg-white text-gray-900"
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* زر العودة */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-8 gap-2 rounded-full"
        >
          <ArrowLeft size={20} />
          {language === "EN" ? "Back" : "رجوع"}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* الجانب الأيسر: الصور */}
          <div className="space-y-6">
            <div className={`aspect-square rounded-[3rem] overflow-hidden p-8 flex items-center justify-center transition-colors ${
              theme === "dark" ? "bg-[#1E1E1E]" : "bg-gray-50"
            }`}>
              <img 
                src={activeImage} 
                alt={product.title} 
                className="w-full h-full object-contain hover:scale-110 transition-transform duration-500" 
              />
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {product.images?.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-24 h-24 rounded-2xl border-2 shrink-0 overflow-hidden p-2 transition-all ${
                    activeImage === img ? "border-primary bg-primary/5" : "border-transparent bg-gray-100 dark:bg-white/5"
                  }`}
                >
                  <img src={img} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* الجانب الأيمن: البيانات */}
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <Badge className="bg-primary/10 text-primary border-none rounded-lg capitalize">
                {product.category}
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-black leading-tight">
                {product.title}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-yellow-500 font-bold">
                  <Star size={18} fill="currentColor" />
                  {product.rating}
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500 text-sm font-medium">
                  {product.stock} {language === "EN" ? "In Stock" : "في المخزن"}
                </span>
              </div>
            </div>

            <p className="text-gray-500 text-lg leading-relaxed italic">
              "{product.description}"
            </p>

            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-black text-accent">${product.price}</span>
              {product.discountPercentage > 0 && (
                <span className="text-xl text-gray-400 line-through">
                  ${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
                </span>
              )}
            </div>

            {/* أزرار التفاعل */}
            <div className="flex gap-4 mt-4">
              <Button onClick={() => addToCart(product)}
              className="flex-1 h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white text-lg font-bold shadow-xl shadow-primary/20 gap-3">
                <ShoppingCart size={22} />
                {language === "EN" ? "Add to Cart" : "أضف للسلة"}
              </Button>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => toggleWishlist(product)}
                className="h-14 w-14 rounded-2xl border-gray-200 dark:border-gray-800"
              >
                <Heart 
                  size={24} 
                  className={isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"} 
                />
              </Button>
            </div>

            {/* مميزات إضافية */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
                <Truck className="text-primary" size={20} />
                {language === "EN" ? "Fast Delivery" : "توصيل سريع"}
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
                <ShieldCheck className="text-primary" size={20} />
                {language === "EN" ? "Original" : "أصلي 100%"}
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
                <RefreshCw className="text-primary" size={20} />
                {language === "EN" ? "7 Days Return" : "إرجاع سهل"}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// مكون الـ Skeleton للتحميل
function ProductSkeleton({ theme }) {
  return (
    <div className={`min-h-screen py-20 px-6 ${theme === "dark" ? "bg-[#121212]" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <Skeleton className="aspect-square rounded-[3rem]" />
        <div className="space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-14 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}