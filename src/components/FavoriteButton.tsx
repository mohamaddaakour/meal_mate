import type { MealSummary } from "../api/types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleFavorite } from "../store/favoritesSlice";

interface FavoriteButtonProps {
  meal: MealSummary;
  variant?: "icon" | "full";
}

export default function FavoriteButton({ meal, variant = "icon" }: FavoriteButtonProps) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(
    (state) => Boolean(state.favorites.items[meal.idMeal]),
  );

  const label = isFavorite ? "Remove from favorites" : "Add to favorites";
  const focusRing =
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500";

  if (variant === "full") {
    return (
      <button
        type="button"
        aria-pressed={isFavorite}
        onClick={() => dispatch(toggleFavorite(meal))}
        className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm transition active:scale-95 ${focusRing} ${
          isFavorite
            ? "bg-rose-500 text-white shadow-rose-500/30 hover:bg-rose-600"
            : "border border-stone-300 bg-white text-stone-700 hover:border-rose-300 hover:text-rose-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-rose-500/60 dark:hover:text-rose-400"
        }`}
      >
        <span aria-hidden="true">{isFavorite ? "♥" : "♡"}</span>
        {isFavorite ? "Saved to favorites" : "Save to favorites"}
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-pressed={isFavorite}
      aria-label={label}
      title={label}
      onClick={() => dispatch(toggleFavorite(meal))}
      className={`grid size-10 place-items-center rounded-full text-xl shadow-lg backdrop-blur-md transition hover:scale-110 active:scale-90 ${focusRing} ${
        isFavorite
          ? "bg-rose-500 text-white shadow-rose-500/40"
          : "bg-white/85 text-stone-700 hover:text-rose-500 dark:bg-stone-900/80 dark:text-stone-200"
      }`}
    >
      <span aria-hidden="true">{isFavorite ? "♥" : "♡"}</span>
    </button>
  );
}
