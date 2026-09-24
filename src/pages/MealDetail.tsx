import { Link, useParams } from "react-router";
import { useMeal } from "../hooks/useMeal";
import { getIngredients } from "../api/getIngredients";
import FavoriteButton from "../components/FavoriteButton";
import { EmptyState, ErrorState } from "../components/Feedback";

function BackLink() {
  return (
    <Link
      to="/search"
      className="inline-flex items-center gap-1 rounded-full text-sm font-semibold text-stone-500 transition hover:text-orange-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 dark:text-stone-400 dark:hover:text-orange-400"
    >
      <span aria-hidden="true">←</span> Back to search
    </Link>
  );
}

function NotFound({ message }: { message: string }) {
  return (
    <section className="space-y-6">
      <BackLink />
      <EmptyState icon="🍳" title="Recipe not found">
        {message}
      </EmptyState>
    </section>
  );
}

export default function MealDetail() {
  // Take the id from the URL
  const { id } = useParams();

  const { data: meal, isPending, isError, error } = useMeal(id);

  if (!id) {
    return <NotFound message="No recipe id was given." />;
  }

  if (isPending) {
    return (
      <div role="status" className="grid animate-pulse gap-8 lg:grid-cols-2">
        <span className="sr-only">Loading recipe ...</span>
        <div className="aspect-square rounded-3xl bg-stone-200 dark:bg-stone-800" />
        <div className="space-y-4 py-4">
          <div className="h-10 w-3/4 rounded-lg bg-stone-200 dark:bg-stone-800" />
          <div className="h-6 w-1/3 rounded-lg bg-stone-200 dark:bg-stone-800" />
          <div className="h-40 rounded-2xl bg-stone-200 dark:bg-stone-800" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <section className="space-y-6">
        <BackLink />
        <ErrorState title="Couldn't load recipe" message={error.message} />
      </section>
    );
  }

  if (!meal) {
    return <NotFound message={`No recipe exists with id "${id}".`} />;
  }

  const ingredients = getIngredients(meal);
  const steps = meal.strInstructions
    .split(/\r?\n/)
    .map((step) => step.trim())
    .filter((step) => step !== "" && !/^step\s*\d+:?$/i.test(step));

  return (
    <article className="space-y-10">
      <BackLink />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="aspect-square w-full rounded-3xl object-cover shadow-2xl shadow-stone-900/20 ring-1 ring-stone-900/5 dark:shadow-black/50"
          />
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap gap-2">
            {meal.strCategory && (
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold tracking-wide text-orange-700 uppercase dark:bg-orange-500/15 dark:text-orange-300">
                {meal.strCategory}
              </span>
            )}
            {meal.strArea && (
              <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold tracking-wide text-sky-700 uppercase dark:bg-sky-500/15 dark:text-sky-300">
                {meal.strArea}
              </span>
            )}
          </div>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">{meal.strMeal}</h1>

          <p className="mt-3 text-stone-500 dark:text-stone-400">
            {ingredients.length} ingredients · {steps.length} steps
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <FavoriteButton
              variant="full"
              meal={{ idMeal: meal.idMeal, strMeal: meal.strMeal, strMealThumb: meal.strMealThumb }}
            />
            {meal.strYoutube && (
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-red-600/30 transition hover:bg-red-700 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
              >
                <span aria-hidden="true">▶</span> Watch on YouTube
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <section
          aria-labelledby="ingredients-heading"
          className="h-fit rounded-3xl bg-white p-6 shadow-sm ring-1 ring-stone-200/70 sm:p-8 lg:sticky lg:top-24 dark:bg-stone-900 dark:ring-stone-800"
        >
          <h2 id="ingredients-heading" className="mb-5 text-2xl font-bold">Ingredients</h2>
          <ul className="divide-y divide-stone-100 dark:divide-stone-800">
            {ingredients.map(({ ingredient, measure }, index) => (
              <li key={`${ingredient}-${index}`} className="flex items-center justify-between gap-4 py-3">
                <span className="flex items-center gap-3 font-medium">
                  <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-orange-400" />
                  {ingredient}
                </span>
                <span className="text-right text-sm text-stone-500 dark:text-stone-400">{measure}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="instructions-heading">
          <h2 id="instructions-heading" className="mb-5 text-2xl font-bold">Instructions</h2>
          <ol className="space-y-5">
            {steps.map((step, index) => (
              <li key={index} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-orange-400 to-rose-500 text-sm font-bold text-white shadow-md shadow-orange-500/30"
                >
                  {index + 1}
                </span>
                <p className="pt-1 leading-relaxed text-stone-700 dark:text-stone-300">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  );
}
