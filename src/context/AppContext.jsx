import { cardContent } from "@/assets/assets";
import React, { createContext } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const value = {
       cardContent
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};