import type { Ingredient, MealFull } from "./types";

export function getIngredients(meal: MealFull): Ingredient[] {
    const result: Ingredient[] = [];

    for (let i = 1; i <=20; i++) {
        const ingredient = meal[`strIngredient${i}` as keyof MealFull] as string | null;

        const measure = meal[`strMeasure${i}` as keyof MealFull] as string | null;

        if (ingredient && ingredient.trim() !== "") {
            result.push({
                ingredient: ingredient.trim(),
                measure: measure ? measure.trim() : ""
            });
        }
    }

    return result;
}