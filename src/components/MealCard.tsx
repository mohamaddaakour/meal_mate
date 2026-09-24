import { Link } from "react-router";
import type { MealSummary } from "../api/types";

interface MealCardProps {
  meal: MealSummary;
}

export default function MealCard({ meal }: MealCardProps) {
  return (
    <li className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">
      <Link to={`/meal/${meal.idMeal}`}>
        <img src={meal.strMealThumb} alt={meal.strMeal} width={120} height={120} />
        <p>{meal.strMeal}</p>
      </Link>
    </li>
  );
}