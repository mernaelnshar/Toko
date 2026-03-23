import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { WishlistProvider } from "./context/WishlistContext";
import "./index.css"; 
createRoot(document.getElementById("root")).render(
    <ThemeProvider>
        <LanguageProvider>
            <WishlistProvider>
            <App />
            </WishlistProvider>
        </LanguageProvider>
    </ThemeProvider>
);