# Vite + TanStack Router Project

This project has been transformed from Next.js to use Vite and TanStack Router.

## Project Structure

```
├── src/
│   ├── components/        # React components
│   │   └── ui/           # UI components (shadcn/ui)
│   ├── routes/           # TanStack Router routes
│   │   ├── __root.tsx    # Root route
│   │   ├── index.tsx     # Home route (redirects to dashboard)
│   │   └── dashboard.tsx # Dashboard route
│   ├── lib/              # Utility functions
│   ├── hooks/            # Custom React hooks
│   ├── data/             # Static data files
│   ├── globals.css       # Global styles
│   └── main.tsx          # Application entry point
├── public/               # Static assets
├── index.html            # HTML entry point
├── vite.config.ts        # Vite configuration
└── package.json          # Dependencies and scripts
```

## Getting Started

### Install Dependencies

```bash
pnpm install
```

or

```bash
npm install
```

### Development

Run the development server:

```bash
pnpm dev
```

or

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build the project for production:

```bash
pnpm build
```

or

```bash
npm run build
```

### Preview

Preview the production build:

```bash
pnpm preview
```

or

```bash
npm run preview
```

## Key Features

- **Vite**: Lightning-fast development server and build tool
- **TanStack Router**: Type-safe, file-based routing with built-in code splitting
- **React 18**: Latest React features
- **TypeScript**: Full type safety
- **Tailwind CSS 4**: Utility-first CSS framework
- **shadcn/ui**: Beautiful, accessible UI components
- **Radix UI**: Unstyled, accessible component primitives

## TanStack Router

This project uses TanStack Router for routing. Routes are defined in the `src/routes` directory:

- `__root.tsx` - Root layout component
- `index.tsx` - Home page (redirects to dashboard)
- `dashboard.tsx` - Dashboard page

The router automatically generates type-safe route definitions. You can see the Router DevTools in development mode.

## Migration Notes

This project was migrated from Next.js to Vite + TanStack Router:

- Removed `next` and Next.js specific packages
- Replaced Next.js App Router with TanStack Router
- Updated all components to remove `'use client'` directives
- Changed from React 19 to React 18 for broader compatibility
- Restructured project to use `src/` directory convention
- Updated TypeScript configuration for Vite
- Removed Vercel Analytics (can be re-added if needed)

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## Learn More

- [Vite Documentation](https://vite.dev/)
- [TanStack Router Documentation](https://tanstack.com/router)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
