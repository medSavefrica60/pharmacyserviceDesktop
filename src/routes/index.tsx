import { createFileRoute } from "@tanstack/react-router";
import "../App.css";
import { SignInComponent } from "@/App";
import { useAuth } from "@/lib/auth";
import { AuthDemo } from "@/components/AuthDemo";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { user, isAuthenticated, tokens, isLoading } = useAuth();

  if (isLoading) {
    return <div style={{ padding: "20px" }}>Loading authentication...</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>🔐 Authentication System Demo</h1>
      <p style={{ color: "#666", marginBottom: "30px" }}>
        This demo shows a complete authentication system built with React
        Context API, featuring login, logout, token management, role-based
        access control, and more.
      </p>

      <SignInComponent />

      <AuthDemo />

      {isAuthenticated && (
        <div
          style={{
            marginTop: "30px",
            padding: "15px",
            backgroundColor: "#f8f9fa",
            borderRadius: "4px",
            border: "1px solid #dee2e6",
          }}
        >
          <details>
            <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
              🔍 Debug Information (Click to expand)
            </summary>
            <div style={{ marginTop: "15px" }}>
              <p>
                <strong>User Data:</strong>
              </p>
              <pre
                style={{
                  fontSize: "12px",
                  overflow: "auto",
                  backgroundColor: "#fff",
                  padding: "10px",
                  borderRadius: "4px",
                }}
              >
                {JSON.stringify(user, null, 2)}
              </pre>

              <p>
                <strong>Token Info:</strong>
              </p>
              <pre
                style={{
                  fontSize: "12px",
                  overflow: "auto",
                  backgroundColor: "#fff",
                  padding: "10px",
                  borderRadius: "4px",
                }}
              >
                {JSON.stringify(
                  {
                    hasAccessToken: !!tokens?.accessToken,
                    hasRefreshToken: !!tokens?.refreshToken,
                    tokenType: tokens?.tokenType,
                    expiresIn: tokens?.expiresIn,
                    expiresAt: tokens?.expiresAt
                      ? new Date(tokens.expiresAt).toLocaleString()
                      : null,
                    timeUntilExpiry: tokens?.expiresAt
                      ? `${Math.round((tokens.expiresAt - Date.now()) / (1000 * 60))} minutes`
                      : null,
                  },
                  null,
                  2,
                )}
              </pre>
            </div>
          </details>
        </div>
      )}
    </div>
  );
}
