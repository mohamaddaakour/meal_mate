import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { searchMeals } from "../api/mealApi";

export function useMealSearch(query: string) {
    return useQuery({
        // This is the cache identity
        queryKey: ["meals", "search", query],

        queryFn: () => searchMeals(query),

        // This is a gate: the query only runs when this is true.
        enabled: query.trim().length >= 2,

        // used to save the old data, example:
        // You type "pizz"   →  [pizza, pizzelle, pizzoccheri]   ← results on screen
        // You type "pizza"  →  [ ]  (empty! waiting for server...)
        // Server replies    →  [pizza, pizza dough, pizza sauce] ← results appear
        placeholderData: keepPreviousData
    });
}