import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useMealSearch } from "../hooks/useMealSearch";
import MealCard from "../components/MealCard";
import { CardSkeletonGrid, EmptyState, ErrorState } from "../components/Feedback";

const suggestions = ["Chicken", "Pasta", "Curry", "Salmon", "Cake"];

export default function Search() {
  const [text, setText] = useState("");
  const debouncedText = useDebounce(text);

  const { data: meals, isPending, isError, error, isPlaceholderData } =
    useMealSearch(debouncedText);

  const hasQuery = debouncedText.trim().length >= 2;

  return (
    <section className="space-y-8">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Search</h1>
        <p className="mt-2 text-stone-500 dark:text-stone-400">
          Find your next favorite dish from hundreds of recipes.
        </p>
      </header>

      <div className="mx-auto max-w-2xl">
        <label htmlFor="search-input" className="sr-only">
          Search recipes
        </label>
        <div className="relative">
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-5 grid place-items-center text-lg text-stone-400">
            🔍
          </span>
          <input
            type="search"
            id="search-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Search your meal"
            autoComplete="off"
            className="w-full rounded-full border border-stone-200 bg-white py-4 pr-6 pl-14 text-lg shadow-lg shadow-stone-900/5 transition placeholder:text-stone-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/20 focus:outline-none dark:border-stone-700 dark:bg-stone-900 dark:shadow-black/20 dark:focus:border-orange-500"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm text-stone-500 dark:text-stone-400">Try:</span>
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setText(s)}
              className="rounded-full bg-stone-200/70 px-3 py-1 text-sm font-medium text-stone-700 transition hover:bg-orange-100 hover:text-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-orange-500/20 dark:hover:text-orange-300"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {!hasQuery && (
        <p className="text-center text-sm text-stone-500 dark:text-stone-400">
          Type at least 2 characters to search.
        </p>
      )}

      {hasQuery && isPending && <CardSkeletonGrid label="Searching ..." />}

      {hasQuery && isError && <ErrorState title="Search failed" message={error.message} />}

      {hasQuery && !isPending && !isError && meals.length === 0 && (
        <EmptyState icon="🥄" title={`No recipes found for "${debouncedText}".`}>
          Try a different ingredient or dish name.
        </EmptyState>
      )}

      {hasQuery && !isPending && !isError && meals.length > 0 && (
        <div className={`space-y-4 transition-opacity ${isPlaceholderData ? "opacity-60" : ""}`}>
          <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
            {meals.length} {meals.length === 1 ? "result" : "results"} for "{debouncedText}"
          </p>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
            {meals.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
