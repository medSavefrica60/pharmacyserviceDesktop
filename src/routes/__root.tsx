import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Navigate,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

interface RootRouteContext {
  queryClient: QueryClient;
  isAuthenticated: boolean;
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
  beforeLoad() {},

  component: () => {
    const { isAuthenticated } = Route.useRouteContext();
    return (
      <>
        {isAuthenticated ? (
          <>
            <SidebarProvider
              style={
                {
                  "--sidebar-width": "calc(var(--spacing) * 72)",
                  "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
              }
            >
              <AppSidebar variant="floating" />
              <SidebarInset>
                <SiteHeader />
                <div className="flex-1 p-6">
                  <Outlet />
                </div>
              </SidebarInset>
            </SidebarProvider>
            <Toaster />
            <TanStackRouterDevtools />
          </>
        ) : (
          <>
            <Navigate to="/login" />
            <Outlet />
          </>
        )}
      </>
    );
  },
});
