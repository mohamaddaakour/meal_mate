import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/mealApi";

export function useCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,

        // After 5 minutes the fetched data will be marked
        // as stale
        staleTime: 5 * 60 * 1000,
    });
}