import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { ThemeContext } from "@/context/ThemeContext";
import { LanguageContext } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, MapPin, Camera, Save, LogOut } from "lucide-react";
import toast from "react-hot-toast";

export default function Profile() {
  const { user, updateProfile } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    toast.success(language === "EN" ? "Profile updated!" : "تم تحديث البيانات!");
  };

  return (
    <div className={`min-h-screen py-16 px-6 transition-colors duration-500 ${
      theme === "dark" ? "bg-[#121212] text-white" : "bg-white text-gray-900"
    }`}>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black mb-12 text-center sm:text-left">
          {language === "EN" ? "Settings" : "الإعدادات"}
        </h1>

        <div className={`rounded-[3rem] overflow-hidden border shadow-2xl transition-all ${
          theme === "dark" ? "bg-[#1E1E1E] border-white/5 shadow-black/40" : "bg-gray-50 border-gray-100 shadow-gray-200/50"
        }`}>
          {/* Header/Cover Color */}
          <div className="h-32 bg-linear-to-r from-primary/40 to-accent/40" />

          <div className="px-8 pb-10">
            {/* Avatar Section */}
            <div className="relative -mt-16 mb-8 flex flex-col items-center sm:items-start">
              <div className="relative group">
                <img 
                  src={user.avatar} 
                  alt="avatar" 
                  className="w-32 h-32 rounded-[2.5rem] border-4 border-white dark:border-[#1E1E1E] bg-white object-cover shadow-xl"
                />
                
              </div>
              <div className="mt-4 text-center sm:text-left">
                <h2 className="text-2xl font-black">{user.name}</h2>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 opacity-60">
                    <User size={14} /> {language === "EN" ? "Full Name" : "الاسم بالكامل"}
                  </Label>
                  <Input 
                    disabled={!isEditing}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="rounded-2xl h-12 bg-white/5 border-gray-200 dark:border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 opacity-60">
                    <Mail size={14} /> {language === "EN" ? "Email Address" : "البريد الإلكتروني"}
                  </Label>
                  <Input 
                    disabled={!isEditing}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="rounded-2xl h-12 bg-white/5 border-gray-200 dark:border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 opacity-60">
                    <Phone size={14} /> {language === "EN" ? "Phone Number" : "رقم الهاتف"}
                  </Label>
                  <Input 
                    disabled={!isEditing}
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="rounded-2xl h-12 bg-white/5 border-gray-200 dark:border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 opacity-60">
                    <MapPin size={14} /> {language === "EN" ? "Location" : "الموقع"}
                  </Label>
                  <Input 
                    disabled={!isEditing}
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="rounded-2xl h-12 bg-white/5 border-gray-200 dark:border-white/10"
                  />
                </div>
              </div>

              <div className="pt-8 flex flex-wrap gap-4 justify-between border-t border-gray-100 dark:border-white/5">
                {isEditing ? (
                  <>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      onClick={() => { setIsEditing(false); setFormData({...user}); }}
                      className="rounded-xl h-12 px-8"
                    >
                      {language === "EN" ? "Cancel" : "إلغاء"}
                    </Button>
                    <Button 
                      type="submit" 
                      className="rounded-xl h-12 px-8 bg-primary hover:bg-primary/90 text-white font-bold gap-2"
                    >
                      <Save size={18} /> {language === "EN" ? "Save Changes" : "حفظ التغييرات"}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      type="button" 
                      onClick={() => setIsEditing(true)}
                      className="rounded-xl h-12 px-10 bg-primary hover:bg-primary/90 text-white font-bold"
                    >
                      {language === "EN" ? "Edit Profile" : "تعديل البيانات"}
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="text-red-500 hover:bg-red-500/10 rounded-xl h-12 gap-2"
                    >
                      <LogOut size={18} /> {language === "EN" ? "Logout" : "تسجيل الخروج"}
                    </Button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}