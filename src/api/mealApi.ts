import axios, { type AxiosInstance } from "axios";
import type { Category, CategoriesResponse } from "./types";

// Create an axios instance with the base URL
export const apiClient: AxiosInstance = axios.create({
    baseURL: "https://www.themealdb.com/api/json/v1/1",
});

export async function getCategories(): Promise<Category[]> {
    const res = await apiClient.get<CategoriesResponse>("/categories.php");

    return res.data.categories ?? [];
}