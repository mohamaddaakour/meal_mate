import { Link, Outlet } from "react-router";

export default function Layout() {
    return (
        <div>
            <header>
                <nav >
                    <Link to={"/"}>Home</Link>
                    <Link to={"/search"}>Search</Link>
                    <Link to={"/favorites"}>Favorites</Link>
                    <Link to={"/planner"}>Planner</Link>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    )
}