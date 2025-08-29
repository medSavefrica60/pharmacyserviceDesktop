import { options } from "@/lib/data/options";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

async function RouteComponent() {
  const { data } = useQuery(options());
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
