import { logger } from "@/lib/logger";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: DashboardPage,
  beforeLoad: async ({ context }) => {
    logger.info("before load triggered");
    if (!context.session) {
      throw redirect({ to: "/login" });
    }
  },
});

function DashboardPage() {
  return (
    <>
      <h1>Dashboard Page</h1>
    </>
  );
}
