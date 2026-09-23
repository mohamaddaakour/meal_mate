import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useMealSearch } from "../hooks/useMealSearch";
import MealCard from "../components/MealCard";

export default function Search() {
  const [text, setText] = useState("");
  const debouncedText = useDebounce(text);

  const { data: meals, isPending, isError, error } = useMealSearch(debouncedText);

  const hasQuery = debouncedText.trim().length >= 2;

  return (
    <section>
      <h1>Search</h1>

      <label htmlFor="search-input">Search recipes</label>
      <input
        type="text"
        id="search-input"
        value={text}
        onChange={(e) => setText(e.target.value) }
        placeholder="Search your meal" />

      {!hasQuery && <p>Type at least 2 characters to search.</p>}

      {hasQuery && isPending && <p>Searching ...</p>}

      {hasQuery && isError && <p>Search failed: {error.message}</p>}

      {hasQuery && !isPending && !isError && meals.length === 0 && (
        <p>No recipes found for "{debouncedText}".</p>
      )}

      {hasQuery && !isPending && !isError && meals.length > 0 && (
        <ul>
          {meals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </ul>
      )}
    </section>
  );
}
