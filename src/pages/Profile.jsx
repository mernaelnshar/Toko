import { useContext, useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore"; // 
import { ThemeContext } from "@/context/ThemeContext";
import { LanguageContext } from "@/context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, MapPin, Save, LogOut, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function Profile() {
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  const { user, updateUser, logout } = useAuthStore();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({ ...user });

  useEffect(() => {
    if (user) setFormData({ ...user });
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateUser(formData); 
      
      setIsEditing(false);
      toast.success(language === "EN" ? "Profile updated!" : "تم تحديث البيانات!");
    } catch (error) {
      toast.error("حدث خطأ ما");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout(); 
    toast.error(language === "EN" ? "Logged out" : "تم تسجيل الخروج");
    navigate("/login");
  };

  if (!user) return null; 

  return (
    <div className={`min-h-screen py-16 px-6 transition-colors duration-500 ${
      theme === "dark" ? "bg-[#121212] text-white" : "bg-white text-gray-900"
    }`}>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black mb-12 text-center sm:text-left tracking-tighter">
          {language === "EN" ? "Profile Settings" : "إعدادات الحساب"}
        </h1>

        <div className={`rounded-[3rem] overflow-hidden border shadow-2xl transition-all duration-500 ${
          theme === "dark" ? "bg-[#1E1E1E] border-white/5 shadow-black/40" : "bg-gray-50 border-gray-100 shadow-gray-200/50"
        }`}>
          {/* Header/Cover */}
          <div className="h-32 bg-linear-to-r from-primary/30 to-accent/30" />

          <div className="px-8 pb-10">
            {/* Avatar Section */}
            <div className="relative -mt-16 mb-8 flex flex-col items-center sm:items-start">
              <div className="relative group">
                <img 
                  src={user.avatar} 
                  alt="avatar" 
                  className="w-32 h-32 rounded-[2.5rem] border-4 border-white dark:border-[#1E1E1E] bg-white object-cover shadow-2xl transition-transform group-hover:scale-105"
                />
              </div>
              <div className="mt-4 text-center sm:text-left">
                <h2 className="text-2xl font-black">{user.name}</h2>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 opacity-60 text-xs font-bold uppercase tracking-widest">
                    <User size={14} /> {language === "EN" ? "Full Name" : "الاسم بالكامل"}
                  </Label>
                  <Input 
                    disabled={!isEditing}
                    value={formData.name || ""}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="rounded-2xl h-12 bg-white/5 border-gray-200 dark:border-white/10 focus:ring-primary"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 opacity-60 text-xs font-bold uppercase tracking-widest">
                    <Mail size={14} /> {language === "EN" ? "Email Address" : "البريد الإلكتروني"}
                  </Label>
                  <Input 
                    disabled={!isEditing}
                    value={formData.email || ""}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="rounded-2xl h-12 bg-white/5 border-gray-200 dark:border-white/10"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 opacity-60 text-xs font-bold uppercase tracking-widest">
                    <Phone size={14} /> {language === "EN" ? "Phone Number" : "رقم الهاتف"}
                  </Label>
                  <Input 
                    disabled={!isEditing}
                    value={formData.phone || ""}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="rounded-2xl h-12 bg-white/5 border-gray-200 dark:border-white/10"
                    placeholder="+20 ..."
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 opacity-60 text-xs font-bold uppercase tracking-widest">
                    <MapPin size={14} /> {language === "EN" ? "Location" : "الموقع"}
                  </Label>
                  <Input 
                    disabled={!isEditing}
                    value={formData.address || ""}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="rounded-2xl h-12 bg-white/5 border-gray-200 dark:border-white/10"
                    placeholder="Cairo, Egypt"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-8 flex flex-wrap gap-4 justify-between border-t border-gray-100 dark:border-white/5">
                {isEditing ? (
                  <div className="flex gap-3 w-full sm:w-auto">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => { setIsEditing(false); setFormData({...user}); }}
                      className="rounded-xl h-12 px-8 flex-1 sm:flex-none"
                    >
                      {language === "EN" ? "Cancel" : "إلغاء"}
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="rounded-xl h-12 px-8 bg-primary hover:bg-primary/90 text-white font-bold gap-2 flex-1 sm:flex-none shadow-lg shadow-primary/20"
                    >
                      {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                      {language === "EN" ? "Save" : "حفظ"}
                    </Button>
                  </div>
                ) : (
                  <Button 
                    type="button" 
                    onClick={() => setIsEditing(true)}
                    className="rounded-xl h-12 px-10 bg-primary hover:bg-primary/90 text-white font-bold flex-1 sm:flex-none"
                  >
                    {language === "EN" ? "Edit Profile" : "تعديل البيانات"}
                  </Button>
                )}

                <Button 
                  type="button"
                  variant="ghost" 
                  onClick={handleLogout}
                  className="text-red-500 hover:bg-red-500/10 hover:text-red-600 rounded-xl h-12 gap-2 flex-1 sm:flex-none"
                >
                  <LogOut size={18} /> {language === "EN" ? "Logout" : "تسجيل الخروج"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}