# Definition

- MealMate is a recipe discovery and weekly meal-planning app built to practice a production-style React + TypeScript architecture. Users can search recipes via TheMealDB, view detailed instructions and ingredients, save favorites, and organize meals into a weekly plan — all persisted locally.

- This project intentionally separates state by type: TanStack Query manages and caches all server data (recipes, categories), Redux Toolkit owns client-side state the user creates (favorites, weekly plan), useState handles local UI state (search input, modals), and useContext manages app-wide theme settings. The goal was to practice choosing the right state-management tool for each kind of data, not just using all of them everywhere.