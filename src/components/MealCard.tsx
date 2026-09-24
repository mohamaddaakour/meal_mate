import { Link } from "react-router";
import type { MealSummary } from "../api/types";

interface MealCardProps {
  meal: MealSummary;
}

export default function MealCard({ meal }: MealCardProps) {
  return (
    <li>
      <Link to={`/meal/${meal.idMeal}`}>
        <img src={meal.strMealThumb} alt={meal.strMeal} width={120} height={120} />
        <p>{meal.strMeal}</p>
      </Link>
    </li>
  );
}