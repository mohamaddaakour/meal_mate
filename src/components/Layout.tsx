import { Link, NavLink, Outlet } from "react-router";
import { useTheme } from "../hooks/useTheme";
import { useAppSelector } from "../store/hooks";

const navItems = [
    { to: "/", label: "Home", end: true },
    { to: "/search", label: "Search", end: false },
    { to: "/favorites", label: "Favorites", end: false },
];

export default function Layout() {
    const { theme, toggleTheme } = useTheme();
    const favoritesCount = useAppSelector(
        (state) => Object.keys(state.favorites.items).length,
    );

    return (
        <div className="flex min-h-screen flex-col bg-stone-50 text-stone-900 antialiased transition-colors duration-300 dark:bg-stone-950 dark:text-stone-100">
            <header className="sticky top-0 z-20 border-b border-stone-200/70 bg-stone-50/80 backdrop-blur-lg dark:border-stone-800/70 dark:bg-stone-950/80">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
                    <Link
                        to="/"
                        aria-label="MealMate home"
                        className="flex items-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
                    >
                        <span className="grid size-9 place-items-center rounded-xl bg-linear-to-br from-orange-400 to-rose-500 text-lg shadow-md shadow-orange-500/30" aria-hidden="true">
                            🍲
                        </span>
                        <span className="hidden text-lg font-extrabold tracking-tight sm:block">
                            Meal<span className="text-orange-500">Mate</span>
                        </span>
                    </Link>

                    <nav aria-label="Main" className="flex items-center gap-1 rounded-full bg-stone-200/60 p-1 dark:bg-stone-800/60">
                        {navItems.map(({ to, label, end }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={end}
                                className={({ isActive }) =>
                                    `relative rounded-full px-3 py-1.5 text-sm font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 sm:px-4 ${
                                        isActive
                                            ? "bg-white text-orange-600 shadow-sm dark:bg-stone-700 dark:text-orange-400"
                                            : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
                                    }`
                                }
                            >
                                {label}
                                {to === "/favorites" && favoritesCount > 0 && (
                                    <span
                                        aria-hidden="true"
                                        className="absolute -top-1 -right-1 grid size-5 place-items-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-stone-50 dark:ring-stone-950"
                                    >
                                        {favoritesCount}
                                    </span>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                        className="grid size-10 place-items-center rounded-full border border-stone-200 bg-white text-lg shadow-sm transition hover:scale-105 hover:shadow-md active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 dark:border-stone-700 dark:bg-stone-800"
                    >
                        <span aria-hidden="true">{theme === "light" ? "🌙" : "☀️"}</span>
                    </button>
                </div>
            </header>

            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
                <Outlet />
            </main>

            <footer className="border-t border-stone-200 py-6 text-center text-sm text-stone-500 dark:border-stone-800 dark:text-stone-400">
                Recipes from{" "}
                <a
                    href="https://www.themealdb.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-orange-600 underline-offset-4 hover:underline dark:text-orange-400"
                >
                    TheMealDB
                </a>
            </footer>
        </div>
    );
}
