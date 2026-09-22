import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import MealDetail from "./pages/MealDetail";
import Favorites from "./pages/Favorites";
import Planner from "./pages/Planner";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="meal/:id" element={<MealDetail />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="planner" element={<Planner />} />
      </Route>
    </Routes>
  );
}