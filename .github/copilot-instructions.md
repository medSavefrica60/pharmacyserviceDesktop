# AI Coding Instructions for Tauri + TanStack Router App

## Project Architecture

This is a **Tauri desktop application** with a React frontend using **file-based routing** via TanStack Router v1.131.28. The app combines:

- **Frontend**: React 19 + TypeScript + Vite + TailwindCSS
- **Backend**: Rust (Tauri v2)
- **Routing**: TanStack Router with auto-generated route tree
- **State**: React Query + Zustand + Custom Authentication with React Context API
- **UI**: shadcn/ui components with Radix primitives

## Critical Architecture Patterns

### Router Setup Pattern

The router is initialized in `src/main.tsx` using a factory pattern that creates both QueryClient and Router instances together:

```tsx
const makeQueryRouter = () => {
  const queryClient = new QueryClient();
  return {
    router: createRouter({
      routeTree,
      context: { queryClient },
      defaultPreload: "intent",
      defaultPreloadStaleTime: 0, // Always fresh with React Query
    }),
    queryClient,
  };
};
```

### File-Based Route Convention

Routes follow TanStack Router's file-based pattern in `src/routes/`:

- `__root.tsx` - Root layout with devtools and navigation
- `index.tsx` - Home route at `/`
- `about.tsx` - About page at `/about`
- `posts/index.tsx` - Posts listing at `/posts`
- `posts/$postid/edit.tsx` - Dynamic route at `/posts/{id}/edit`

**Always export routes using**: `export const Route = createFileRoute('/path')({ ... })`

### Authentication Integration

Uses custom React Context API authentication system with real API integration. Auth state is managed via:

```tsx
const { user, isAuthenticated, signIn, signOut, error } = useAuth();
```

Access auth state in routes using `useAuth()` hook to get user, authentication status, and all auth functions.

### React Query Integration

Query options pattern in `src/lib/data/options.ts`:

```tsx
export const options = () => queryOptions({
  queryKey: ["posts"],
  queryFn: async () => axios.get("https://randomuser.me/api/").then(res => res.data)
});
```

## Essential Development Commands

### Development Workflow

```bash
# Frontend only (Vite dev server)
pnpm dev

# Full Tauri development (recommended)
pnpm tauri dev

# Build for production
pnpm build
pnpm tauri build
```

### Route Generation

TanStack Router auto-generates `src/routeTree.gen.ts` via the Vite plugin. **Never edit this file manually**.

## Critical Configuration Files

- `vite.config.ts` - Configures TanStack Router plugin with `autoCodeSplitting: true`
- `tauri.conf.json` - Tauri app config, dev server on port 1420
- `src/main.tsx` - App entry point with router/query/auth provider setup
- `src/routes/__root.tsx` - Root layout with devtools positioned bottom-right/top-right

## Component and Styling Patterns

### UI Components

Use shadcn/ui components from `src/components/ui/`. Common pattern:

```tsx
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils" // For className merging
```

### TailwindCSS + CVA

Class variance authority is configured. Use `cn()` utility for conditional classes.

## Tauri-Specific Considerations

### Development vs Production

- Dev: Vite serves frontend on localhost:1420, Tauri wraps it
- Build: Frontend compiled to `dist/`, bundled into Tauri binary
- HMR: Configured for Tauri development with custom port 1421

### Rust Backend

- Entry point: `src-tauri/src/main.rs`
- Library code: `src-tauri/src/lib.rs`
- Build artifacts in `src-tauri/target/`

## Key Integration Points

1. **Router Context**: QueryClient passed via router context for type-safe data loading in routes
2. **Auth Provider**: Wraps entire app, auth state available in all routes via hooks
3. **Devtools**: Both React Query and TanStack Router devtools enabled in development
4. **File Watching**: Vite ignores `src-tauri/` directory changes to avoid conflicts

## Common Patterns

### Adding New Routes

1. Create file in `src/routes/` following naming convention
2. Use `createFileRoute('/path')` export pattern
3. Route tree regenerates automatically via Vite plugin

### Data Loading

Combine TanStack Query with router loaders for optimal caching:

```tsx
export const Route = createFileRoute('/posts/$postId')({
  loader: ({ context: { queryClient }, params }) =>
    queryClient.ensureQueryData(postOptions(params.postId))
});
```

### Dynamic Routes

Use `$` prefix for dynamic segments: `posts/$postid/edit.tsx` → `/posts/123/edit`

## Development Notes

- Use `pnpm` as package manager (lockfile present)
- TypeScript strict mode enabled
- Prettier configured with Tailwind plugin
- Auth tokens stored in localStorage with auto-refresh (10min interval)
