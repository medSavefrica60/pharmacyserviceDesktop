import { logger } from "@/lib/logger";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { invoke } from "@tauri-apps/api/core";

export const Route = createFileRoute("/")({
  component: DashboardPage,
  beforeLoad: async ({ context }) => {
    if (!context.session) {
      throw redirect({ to: "/login" });
    }
  },
});

function DashboardPage() {
  // const { session } = Route.useRouteContext();

  async function refresh_session() {
    // const refresh_data = await invoke("refresh_otp", {
    //   refreshToken: "refresh token",
    // }).catch((s) => {
    //   logger.debug("error while refreshing: ", s);
    // });

    const session = await invoke("get_current_session");

    logger.debug("refreshed data: ", session);
  }

  return (
    <>
      <h1>Dashboard Page</h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">Session</h2>
          {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
        </div>
      </div>

      <button
        className="px-6 py-2 bg-rose-50"
        onClick={refresh_session}
        type="button"
      >
        Refresh Button
      </button>
    </>
  );
}
