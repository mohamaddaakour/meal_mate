import { useContext } from "react";
import { themeContext, type ThemeContextValue } from "../context/theme-context";

// Fetch the context value
export function useTheme(): ThemeContextValue {
    const context = useContext(themeContext);

    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
}