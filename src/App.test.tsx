import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import App from "./App";

// This is a small reusable helper. Instead of repeating
// the same render logic in every test, renderApp() wraps <App />
// inside <MemoryRouter>, starting at the "/" route (the homepage). Every test
// calls this function to get the app rendered and ready to interact with.
function renderApp() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>,
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