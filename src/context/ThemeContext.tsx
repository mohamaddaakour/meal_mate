import { useEffect, useState, type ReactNode } from "react";
import { themeContext, type Theme } from "./theme-context";

function getInitialTheme(): Theme {
    // Get the value of theme key from the local storage
    const stored = window.localStorage.getItem("theme");

    if (stored === "dark" || stored === "light") {
        return stored;
    }

    // light is the default theme
    return "light";
}

// Create the theme provider
export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    useEffect(() => {
        // If the theme is dark, make sure the <html> element has the class dark.
        // Otherwise, make sure it doesn't
        document.documentElement.classList.toggle("dark", theme === "dark");

        window.localStorage.setItem("theme", theme);
    }, [theme]);

    function toggleTheme() {
        setTheme((prev) => prev === "light" ? "dark" : "light" );
    }

    return (
        <themeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </themeContext.Provider>
    )
}

