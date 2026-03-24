import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user_profile");
        return saved ? JSON.parse(saved) : {
            name: "Guest User",
            email: "guest@example.com",
            phone: "+20 123 456 789",
            address: "Cairo, Egypt",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
        };
    });

    const updateProfile = (newData) => {
        setUser(newData);
        localStorage.setItem("user_profile", JSON.stringify(newData));
    };

    return (
        <UserContext.Provider value={{ user, updateProfile }}>
            {children}
        </UserContext.Provider>
    );
};