import { useParams } from "react-router";
import { useMeal } from "../hooks/useMeal";
import { getIngredients } from "../api/getIngredients";

export default function MealDetail() {
  // Take the id from the URL
  const { id } = useParams();

  const { data: meal, isPending, isError, error } = useMeal(id);

  if (!id) {
    return (
      <section>
        <h1>Recipe not found</h1>
        <p>No recipe id was given.</p>
      </section>
    );
  }

  if (isPending) {
    return <p>Loading recipe ...</p>;
  }

  if (isError) {
    return <p>Couldn't load recipe: {error.message}</p>;
  }

  if (!meal) {
    return (
      <section>
        <h1>Recipe not found</h1>
        <p>No recipe exists with id "{id}".</p>
      </section>
    );
  }
    const ingredients = getIngredients(meal);

  return (
    <section>
      <h1>{meal.strMeal}</h1>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        width={300}
        height={300}
      />
      <p>
        {meal.strCategory} · {meal.strArea}
      </p>

      <h2>Ingredients</h2>
      <ul>
        {ingredients.map(({ ingredient, measure }) => (
          <li key={ingredient}>
            {measure} {ingredient}
          </li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <p>{meal.strInstructions}</p>

      {meal.strYoutube && (
        <p>
          <a href={meal.strYoutube} target="_blank" >
            Watch on YouTube
          </a>
        </p>
      )}
    </section>
  );
}