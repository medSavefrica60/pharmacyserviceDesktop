import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/back")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/posts/back"!</div>;
}
