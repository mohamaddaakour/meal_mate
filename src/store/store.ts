import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";

// Create the store
export const store = configureStore({
    // reducer is the setting that tells the store which reducers to use.
  reducer: {
    favorites: favoritesReducer,
  },
});

// It creates a type describing the shape of your entire state.
export type RootState = ReturnType<typeof store.getState>;

// `store.dispatch` is the function you use to send actions
export type AppDispatch = typeof store.dispatch;