import { createContext } from "react";

export type Theme = "light" | "dark";

export interface ThemeContextValue {
    theme: Theme;
    toggleTheme: () => void;
}

// Create the theme context
export const themeContext = createContext<ThemeContextValue | undefined>(undefined);
