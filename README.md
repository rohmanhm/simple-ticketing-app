# Simple Ticketing App

> A simple ticketing app built with React, TypeScript, and Tailwind CSS.


## Table of Contents

- [Simple Ticketing App](#simple-ticketing-app)
  - [Table of Contents](#table-of-contents)
  - [Technologies](#technologies)
  - [Requirements](#requirements)
  - [Development](#development)
  - [Project Pattern, File \& Folder Structure](#project-pattern-file--folder-structure)
    - [Resources](#resources)

## Technologies

- [MSW](https://mswjs.io/). We use MSW to mock the API requests. And the data will be saved into the user browser localstorage.
- [Tailwind CSS](https://tailwindcss.com/). We use Tailwind CSS for styling the app.
- [React Query](https://react-query.tanstack.com/). We use React Query for fetching and caching the data.
- [React Router](https://reactrouter.com/). We use React Router for routing the app.
- [React Hook Form](https://react-hook-form.com/). We use React Hook Form for handling the form state.
- [TypeScript](https://www.typescriptlang.org/). We use TypeScript for static type checking.
- [shadcn-ui](https://ui.shadcn.com/). We use shadcn-ui for the UI components.
- [Vite](https://vitejs.dev/). We use Vite for the build tool.
- [Prettier](https://prettier.io/). We use Prettier for code formatting. Including the imports sorting
- and many more.

## Requirements

- Node.js v16+
- pnpm

## Development

1. Clone the repository
2. Run `pnpm install` to install the dependencies
3. Run `pnpm dev` to start the development server
4. Open `http://localhost:3000` in your browser
5. Happy coding!

## Project Pattern, File & Folder Structure

We're adapting the feature-driven folder structure. Each feature will have its own folder containing all the components, hooks, services and other related files.

```
public/
src/
├── components/
├──── ui/
├── hooks/
├── hocs/
├── features/
├── routes/
├── mocks/
├── assets/
├── mocks/
├── router.tsx
├── App.tsx
├── main.tsx
```

### Resources
- [A feature based approach to React development](https://ryanlanciaux.com/blog/2017/08/20/a-feature-based-approach-to-react-development/)
- [Structuring React Projects with Feature-Driven Development 🏗️](https://medium.com/@Evelyn.Taylor/structuring-react-projects-with-feature-driven-development-%EF%B8%8F-b671ee898145)
