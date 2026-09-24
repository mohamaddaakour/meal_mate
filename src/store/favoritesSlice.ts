import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MealSummary } from "../api/types";

export interface FavoritesState {
  items: Record<string, MealSummary>;
}

const initialState: FavoritesState = {
  items: {},
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<MealSummary>) {
      const meal = action.payload;
      if (state.items[meal.idMeal]) {
        delete state.items[meal.idMeal];
      } else {
        state.items[meal.idMeal] = meal;
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
