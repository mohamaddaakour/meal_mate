import { Link } from "react-router";
import { useCategories } from "../hooks/useCategories";
import { CardSkeletonGrid, EmptyState, ErrorState } from "../components/Feedback";

export default function Home() {
  const { data: categories, isPending, isError, error } = useCategories();

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-rose-500 to-pink-600 px-6 py-14 text-white shadow-2xl shadow-orange-500/20 sm:px-12 sm:py-20">
        <div aria-hidden="true" className="absolute -top-24 -right-24 size-72 rounded-full bg-white/10 blur-2xl" />
        <div aria-hidden="true" className="absolute -bottom-32 -left-16 size-80 rounded-full bg-yellow-300/20 blur-3xl" />

        <div className="relative max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wider uppercase ring-1 ring-white/25 backdrop-blur">
            <span aria-hidden="true">✨</span> Your kitchen companion
          </p>
          <h1 className="text-5xl font-black tracking-tight sm:text-7xl">MealMate</h1>
          <p className="mt-4 text-lg text-white/90 sm:text-xl">
            Browse recipe categories, discover something delicious, and keep your favorites one tap away.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/search"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-rose-600 shadow-lg transition hover:scale-105 hover:shadow-xl active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span aria-hidden="true">🔍</span> Find a recipe
            </Link>
            <Link
              to="/favorites"
              className="inline-flex items-center gap-2 rounded-full bg-white/15 px-6 py-3 font-semibold text-white ring-1 ring-white/40 backdrop-blur transition hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span aria-hidden="true">♥</span> My favorites
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="categories-heading">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 id="categories-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">
              Browse by category
            </h2>
            <p className="mt-1 text-stone-500 dark:text-stone-400">From breakfast to dessert, and everything between.</p>
          </div>
          {!isPending && !isError && categories.length > 0 && (
            <span className="hidden rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700 sm:inline dark:bg-orange-500/15 dark:text-orange-300">
              {categories.length} categories
            </span>
          )}
        </div>

        {isPending && <CardSkeletonGrid label="Loading categories..." />}

        {isError && <ErrorState title="Couldn't load categories" message={error.message} />}

        {!isPending && !isError && categories.length === 0 && (
          <EmptyState icon="🍽️" title="No categories found." />
        )}

        {!isPending && !isError && categories.length > 0 && (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
            {categories.map((category) => (
              <li
                key={category.idCategory}
                className="group flex flex-col items-center rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-stone-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-stone-900 dark:ring-stone-800"
              >
                <div className="mb-4 grid size-28 place-items-center rounded-full bg-gradient-to-br from-orange-50 to-rose-50 transition duration-300 group-hover:scale-105 dark:from-stone-800 dark:to-stone-800/50">
                  <img
                    src={category.strCategoryThumb}
                    alt={category.strCategory}
                    loading="lazy"
                    className="w-24 object-contain drop-shadow-md"
                  />
                </div>
                <span className="font-bold">{category.strCategory}</span>
                <p className="mt-1 line-clamp-2 text-xs text-stone-500 dark:text-stone-400">
                  {category.strCategoryDescription}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
