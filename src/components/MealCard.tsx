import type { MealSummary } from "../api/types";

interface MealCardProps {
  meal: MealSummary;
}

export default function MealCard({ meal }: MealCardProps) {
  return (
    <li>
      <img src={meal.strMealThumb} alt={meal.strMeal} width={120} height={120} />
      <p>{meal.strMeal}</p>
    </li>
  );
}