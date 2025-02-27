import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
    theme: Theme,
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const getInitialTheme = () => localStorage.getItem("theme") as Theme || "light";
    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    useEffect(() => {
        localStorage.setItem("theme", theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            <main className={`${theme} text-foreground bg-background`}>
                {children}
            </main>
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const themeContext = useContext(ThemeContext);
    if(!themeContext) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return themeContext;
}

export default ThemeProvider;