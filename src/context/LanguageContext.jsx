import { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState("EN"); // Default = EN

    const toggleLanguage = () => {
        setLanguage(prev => (prev === "EN" ? "AR" : "EN"));
    };

    useEffect(() => {
        const storedLang = localStorage.getItem("language");
        if (storedLang) {
            setLanguage(storedLang);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}