import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: DashboardPage,
  beforeLoad: async () => {},
});

function DashboardPage() {
  const a = Route.useRouteContext();

  return (
    <>
      <h1>Dashboard Page</h1>
      <p>isAuthenticated: {a.isAuthenticated.toString()}</p>
    </>
  );
}
