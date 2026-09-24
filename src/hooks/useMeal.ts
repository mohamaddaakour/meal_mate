import { useQuery } from "@tanstack/react-query";
import { getMealById } from "../api/mealApi";

export function useMeal(id: string | undefined) {
    return useQuery({
        queryKey: ["meal", id],
        queryFn: () => getMealById(id as string),
        enabled: Boolean(id),
    });
}