import { createFileRoute } from "@tanstack/react-router";
import "../App.css";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const context = Route.useRouteContext();

  const isFetching = context.queryClient.isFetching();
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/routes/index.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="App-link"
          href="https://tanstack.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn TanStack
        </a>
      </header>
      <span>{isFetching}</span>
    </div>
  );
}
