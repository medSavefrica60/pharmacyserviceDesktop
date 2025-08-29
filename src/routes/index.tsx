import { createFileRoute } from "@tanstack/react-router";
import "../App.css";
import { SignInComponent } from "@/App";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const {} = useAuth();

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <SignInComponent />
    </div>
  );
}
