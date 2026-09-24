import { Link } from "react-router";
import type { MealSummary } from "../api/types";
import FavoriteButton from "./FavoriteButton";

interface MealCardProps {
  meal: MealSummary;
}

export default function MealCard({ meal }: MealCardProps) {
  return (
    <li className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/10 dark:bg-stone-900 dark:ring-stone-800 dark:hover:shadow-black/40">
      <Link
        to={`/meal/${meal.idMeal}`}
        className="block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
      >
        <div className="relative aspect-square overflow-hidden">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            loading="lazy"
            className="size-full object-cover transition duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
        </div>
        <p className="line-clamp-2 p-4 font-semibold leading-snug transition-colors group-hover:text-orange-600 dark:group-hover:text-orange-400">
          {meal.strMeal}
        </p>
      </Link>
      <div className="absolute top-3 right-3">
        <FavoriteButton meal={meal} />
      </div>
    </li>
  );
}
