# MealMate 🍲

A recipe discovery app built with React and TypeScript. Browse categories, search recipes, view full recipe details, and save your favorites. All recipe data comes from [TheMealDB](https://www.themealdb.com).

## Features

- Browse recipe categories
- Search recipes by name (debounced, so it doesn't fire a request on every keystroke)
- Recipe detail page with ingredients, step-by-step instructions, and a YouTube link
- Save and unsave favorite recipes
- Light and dark theme, remembered across reloads

## Tech stack

- **React 19** + **TypeScript** (strict mode)
- **Vite** for development and builds
- **React Router** for routing
- **TanStack Query** for fetching and caching API data
- **Redux Toolkit** for favorites
- **Tailwind CSS v4** for styling
- **Vitest** + **React Testing Library** for tests

## Where state lives

| State | Tool | Why |
|---|---|---|
| Search input text | `useState` | Local to one component |
| Theme (light/dark) | `useContext` | Small, global, rarely changes |
| Categories, search results, recipe details | TanStack Query | Server data that needs caching and loading/error states |
| Favorites | Redux Toolkit | User-owned data shared across pages |

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run the tests |

## Project structure

```
src/
├── api/          Typed API calls to TheMealDB
├── components/   Layout, MealCard, FavoriteButton, loading/error/empty states
├── context/      Theme context and provider
├── hooks/        useCategories, useMealSearch, useMeal, useDebounce, useTheme
├── pages/        Home, Search, MealDetail, Favorites
└── store/        Redux store and favorites slice
```

## Notes

- There's no backend or login. Favorites currently live in memory and reset on reload.
- Uses TheMealDB's free public API key (`1`).
