import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$postid/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/posts/$edit/"!</div>;
}
