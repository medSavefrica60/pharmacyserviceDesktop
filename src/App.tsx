import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { routeTree } from "./routeTree.gen";
import { useSession } from "./hooks/auth";

const makeQueryRouter = () => {
  const queryClient = new QueryClient();

  return {
    router: createRouter({
      routeTree,
      context: {
        queryClient,
      },

      defaultPreload: "intent",
      // Since we're using React Query, we don't want loader calls to ever be stale
      // This will ensure that the loader is always called when the route is preloaded or visited
      defaultPreloadStaleTime: 0,
      scrollRestoration: true,
    }),
    queryClient,
  };
};

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof makeQueryRouter>["router"];
  }
}

export function App() {
  const { router, queryClient } = makeQueryRouter();
  const { session } = useSession();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ queryClient, session }} />
    </QueryClientProvider>
  );
}
