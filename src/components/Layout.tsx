import { Link, Outlet } from "react-router";
import { useTheme } from "../hooks/useTheme";

export default function Layout() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
            <header className="flex items-center justify-between p-4">
                <nav className="flex gap-4">
                    <Link to={"/"}>Home</Link>
                    <Link to={"/search"}>Search</Link>
                    <Link to={"/favorites"}>Favorites</Link>
                    <Link to={"/planner"}>Planner</Link>
                </nav>

                <button
                    type="button"
                    onClick={toggleTheme}
                    aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                >
                    {theme === "light" ? "🌙 Dark mode" : "☀️ Light mode"}
                </button>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    )
}