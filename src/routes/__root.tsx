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
import { useSession } from "@/hooks/auth";
import { Session } from "@/hooks/auth/use-auth";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { useTokenRefresh } from "@/hooks/auth/use-token-refresh";

interface RootRouteContext {
  queryClient: QueryClient;
  session?: Session | null;
}

// Inner component that uses auth context
const RootComponent = () => {
  const { session, isLoading } = useSession();

  // Initialize token refresh
  // useTokenRefresh();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      {!!session ? (
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
          <ReactQueryDevtools />
        </>
      ) : (
        <>
          <Navigate to="/login" />
          <Outlet />
        </>
      )}
    </>
  );
};

export const Route = createRootRouteWithContext<RootRouteContext>()({
  beforeLoad() {},

  component: () => {
    return <RootComponent />;
  },
});
