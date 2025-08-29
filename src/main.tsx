import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/lib/auth";

import { routeTree } from "./routeTree.gen";
import "./App.css";

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

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  const { router, queryClient } = makeQueryRouter();

  root.render(
    <AuthProvider refreshInterval={30}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>,
  );
}
