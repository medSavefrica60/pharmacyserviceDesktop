import {
  createFileRoute,
  getRouteApi,
  useParams,
} from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$love")({
  component: () => RouteComponent(),
  loader: async (ctx) => {
    console.log("LOADING!", ctx.params);
    return { love: ctx.params.love };
  },
  beforeLoad(ctx) {
    ctx.params = { ...ctx.params, love: "true" };
  },
});

function RouteComponent() {
  const love = Route.useParams();
  const a = useParams({ from: "/posts/$love" });
  const routeApi = getRouteApi(`/posts/$love`);
  const params = routeApi.useParams();
  return <div>Hello "/posts/$love"! sdfa {JSON.stringify(params)}</div>;
}
