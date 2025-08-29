import { useAuth } from "@/lib/auth/context";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/back")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuth();
  return (
    <>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <div>Hello "/posts/back"!</div>
    </>
  );
}
