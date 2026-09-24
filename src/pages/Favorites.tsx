import { Link } from "react-router";
import { useAppSelector } from "../store/hooks";
import MealCard from "../components/MealCard";
import { EmptyState } from "../components/Feedback";

export default function Favorites() {
  const favorites = useAppSelector((state) => state.favorites.items);
  const meals = Object.values(favorites);

  return (
    <section className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Favorites</h1>
          <p className="mt-2 text-stone-500 dark:text-stone-400">The recipes you've saved for later.</p>
        </div>
        {meals.length > 0 && (
          <span className="rounded-full bg-rose-100 px-4 py-1.5 text-sm font-semibold text-rose-700 dark:bg-rose-500/15 dark:text-rose-300">
            ♥ {meals.length} saved
          </span>
        )}
      </header>

      {meals.length === 0 && (
        <EmptyState icon="💔" title="You haven't saved any favorites yet.">
          <p>Tap the heart on any recipe to keep it here.</p>
          <Link
            to="/search"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 font-semibold text-white shadow-md shadow-orange-500/30 transition hover:bg-orange-600 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          >
            <span aria-hidden="true">🔍</span> Discover recipes
          </Link>
        </EmptyState>
      )}

      {meals.length > 0 && (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
          {meals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </ul>
      )}
    </section>
  );
}
