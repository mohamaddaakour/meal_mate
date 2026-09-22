import { useCategories } from "../hooks/useCategories";

export default function Home() {
  const { data: categories, isPending, isError, error } = useCategories();

  return (
    <section>
      <h1>MealMate</h1>
      <p>Browse recipe categories and plan your week.</p>

      {/* Handling loading the categories */}
      {isPending && <p>Loading categories...</p>}

      {/* Handling Errors */}
      {isError && <p>Couldn't load categories: {error.message}</p>}

      {!isPending && !isError && categories.length === 0 && (
        <p>No categories found.</p>
      )}

      {!isPending && !isError && categories.length > 0 && (
        <ul>
          {categories.map((category => (
            <li key={category.idCategory}>
              <img 
                src={category.strCategoryThumb}
                alt={category.strCategory}
                width={80}
                height={80} />
              
              <span>{category.strCategory}</span>
            </li>
          )))}
        </ul>
      )}
    </section>
  );
}
