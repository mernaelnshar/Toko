import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "@/context/ThemeContext";
import { LanguageContext } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart, Star, RefreshCw, Layers, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { WishlistContext } from "@/context/WishlistContext";

export default function Home() {
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);


  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- حالات الـ Pagination ---
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 8; // عرض 8 منتجات في كل صفحة

  const fetchData = async (currentSkip = 0, category = activeCategory) => {
    setLoading(true);
    setError(null);
    try {
      // جلب الأقسام مرة واحدة فقط
      if (categories.length === 0) {
        const catRes = await axios.get("https://dummyjson.com/products/categories");
        setCategories(catRes.data.slice(0, 8));
      }

      // بناء الرابط بناءً على القسم والـ skip
      let url = `https://dummyjson.com/products?limit=${limit}&skip=${currentSkip}`;
      if (category !== "all") {
        url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${currentSkip}`;
      }

      const prodRes = await axios.get(url);
      setProducts(prodRes.data.products);
      setTotal(prodRes.data.total); // تحديث إجمالي المنتجات للتحكم في الأزرار
    } catch {
      setError(language === "EN" ? "Error loading data" : "خطأ في تحميل البيانات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(0, "all");
  }, []);

  const handleCategoryChange = (slug) => {
    setActiveCategory(slug);
    setSkip(0); // تصفير الصفحة عند تغيير القسم
    fetchData(0, slug);
  };

  const handleNext = () => {
    const nextSkip = skip + limit;
    setSkip(nextSkip);
    fetchData(nextSkip, activeCategory);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // العودة لأعلى الصفحة
  };

  const handlePrev = () => {
    const prevSkip = Math.max(0, skip - limit);
    setSkip(prevSkip);
    fetchData(prevSkip, activeCategory);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen pb-20 transition-colors duration-300 ${theme === "dark" ? "bg-[#121212] text-white" : "bg-white text-gray-900"
      }`}>

      {/* Categories Bar */}
      <div className={`sticky top-18 z-40 border-b backdrop-blur-md transition-colors ${theme === 'dark' ? 'bg-[#121212]/80 border-white/5' : 'bg-white/80 border-gray-100'
        }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 pr-4 border-r border-gray-200 dark:border-gray-800 shrink-0">
            <Layers size={18} className="text-primary" />
            <span className="font-bold text-sm hidden sm:block">
              {language === "EN" ? "Categories" : "الأقسام"}
            </span>
          </div>

          <Button
            variant={activeCategory === "all" ? "default" : "ghost"}
            className={`rounded-full px-6 transition-all ${activeCategory === "all" ? "bg-primary hover:bg-primary/90" : ""}`}
            onClick={() => handleCategoryChange("all")}
          >
            {language === "EN" ? "All" : "الكل"}
          </Button>

          {categories.map((cat) => (
            <Button
              key={cat.slug}
              variant={activeCategory === cat.slug ? "default" : "ghost"}
              className={`rounded-full px-6 capitalize transition-all ${activeCategory === cat.slug ? "bg-accent hover:bg-accent/90" : ""
                }`}
              onClick={() => handleCategoryChange(cat.slug)}
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Title and Count */}
        <div className="flex flex-col gap-2 mb-10">
          <h2 className="text-3xl font-black tracking-tight capitalize">
            {activeCategory === 'all'
              ? (language === "EN" ? "New Arrivals" : "وصل حديثاً")
              : activeCategory.replace('-', ' ')}
          </h2>
          <p className="text-gray-500 text-sm">
            {language === "EN" ? `Showing ${skip + 1} - ${Math.min(skip + limit, total)} of ${total} items` : `عرض ${skip + 1} - ${Math.min(skip + limit, total)} من أصل ${total} منتج`}
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(limit)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-70 w-full rounded-[2rem]" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className={`group relative border-none overflow-hidden rounded-[2.5rem] transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 ${theme === 'dark' ? 'bg-[#1E1E1E]' : 'bg-gray-50'
                    }`}
                >
                  <CardContent className="p-0 relative">
                    {/* --- زر الـ Wishlist محطوط هنا صح فوق الصورة --- */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.preventDefault(); // عشان لو الكارت كله لينك ميفتحش الصفحة
                        toggleWishlist(product);
                      }}
                      className="absolute top-4 left-4 z-20 bg-white/70 dark:bg-black/40 backdrop-blur-md rounded-full hover:bg-white dark:hover:bg-black transition-all shadow-sm"
                    >
                      <Heart
                        size={20}
                        className={isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"}
                      />
                    </Button>

                    <div className={`p-6 aspect-square flex items-center justify-center transition-colors duration-500 ${theme === 'dark' ? 'bg-white/5' : 'bg-white'}`}>
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    {/* تاق الخصم - نزحزحه شوية عشان ميخبطش في القلب لو موجود */}
                    {product.discountPercentage > 10 && (
                      <Badge className="absolute bottom-4 left-4 bg-red-500 text-white border-none rounded-lg px-2 shadow-lg">
                        -{Math.round(product.discountPercentage)}%
                      </Badge>
                    )}

                    <div className="absolute top-4 right-4 bg-white/95 dark:bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1 text-xs font-black text-yellow-500 shadow-sm">
                      <Star size={14} fill="currentColor" /> {product.rating}
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-col items-start p-6 gap-4">
                    <div className="space-y-1 w-full text-left">
                      <span className="text-[10px] uppercase tracking-widest text-primary font-bold opacity-80">
                        {product.category}
                      </span>
                      <h3 className="font-bold text-base truncate group-hover:text-primary transition-colors">
                        {product.title}
                      </h3>
                    </div>

                    <div className="flex justify-between items-center w-full">
                      <span className="text-2xl font-black text-accent">${product.price}</span>
                      <Button
                        size="icon"
                        className="h-12 w-12 rounded-[1.2rem] bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30 active:scale-90 transition-all"
                      >
                        <ShoppingCart size={20} />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* --- Pagination Buttons --- */}
            <div className="mt-16 flex justify-center items-center gap-6">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={skip === 0}
                className="rounded-2xl px-6 h-12 gap-2 border-gray-200 dark:border-gray-800"
              >
                <ChevronLeft size={20} />
                {language === "EN" ? "Previous" : "السابق"}
              </Button>

              <span className="font-bold text-sm">
                {Math.floor(skip / limit) + 1} / {Math.ceil(total / limit)}
              </span>

              <Button
                variant="outline"
                onClick={handleNext}
                disabled={skip + limit >= total}
                className="rounded-2xl px-6 h-12 gap-2 border-gray-200 dark:border-gray-800"
              >
                {language === "EN" ? "Next" : "التالي"}
                <ChevronRight size={20} />
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}