import axios, { type AxiosInstance } from "axios";
import type { Category, CategoriesResponse, SearchMealResponse, MealSummary } from "./types";

// Create an axios instance with the base URL
export const apiClient: AxiosInstance = axios.create({
    baseURL: "https://www.themealdb.com/api/json/v1/1",
});

export async function getCategories(): Promise<Category[]> {
    const res = await apiClient.get<CategoriesResponse>("/categories.php");

    return res.data.categories ?? [];
}

// Fetch the searched meals by their name
export async function searchMeals(query: string): Promise<MealSummary[]> {
    const res = await apiClient.get<SearchMealResponse>("/search.php", {
        // This is a config object passed as the second argument to .get().
        // It tells the HTTP client to append ?s=<query> to the URL.
        // So if query is "pasta", the actual request becomes /search.php?search=pasta.
        params: { s: query },
    });

    return res.data.meals ?? [];
}