import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "./context/ThemeContext";
import favoritesReducer from "./store/favoritesSlice";
import App from "./App";

// Keep tests off the real network.
vi.mock("./api/mealApi", () => ({
  getCategories: vi.fn().mockResolvedValue([]),
  searchMeals: vi.fn().mockResolvedValue([]),
  getMealById: vi.fn().mockResolvedValue(null),
}));

// This is a small reusable helper. Instead of repeating
// the same render logic in every test, renderApp() wraps <App />
// in every provider it needs, starting at the "/" route (the homepage).
function renderApp() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const store = configureStore({ reducer: { favorites: favoritesReducer } });

  return render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={["/"]}>
            <App />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>,
  );
}

describe("App routing", () => {
  it("renders the Home page at /", () => {
    renderApp();
    expect(
      screen.getByRole("heading", { name: "MealMate" }),
    ).toBeInTheDocument();
  });

  it("navigates to the Search page when its nav link is clicked", async () => {
    renderApp();

    // Sets up userEvent (which simulates real
    // user interactions more accurately than firing raw DOM events).
    const user = userEvent.setup();

    // Finds a link with the text "Search" and clicks it.
    await user.click(screen.getByRole("link", { name: "Search" }));

    expect(
      screen.getByRole("heading", { name: "Search" }),
    ).toBeInTheDocument();
  });
});
