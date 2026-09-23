export interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}

export interface CategoriesResponse {
    categories: Category[] | null;
}

export interface MealSummary {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

export interface SearchMealResponse {
    meals: MealSummary[] | null;
}