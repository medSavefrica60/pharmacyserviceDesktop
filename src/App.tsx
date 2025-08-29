import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { MockAuthService } from "@/lib/auth/mockService";

export default function App() {
  return <SignInComponent />;
}

export const SignInComponent = () => {
  const { signIn, signOut, user, isAuthenticated, isLoading, error } =
    useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async () => {
    if (!formData.email || !formData.password) {
      alert("Please fill in both email and password");
      return;
    }

    setIsSigningIn(true);

    try {
      const response = await MockAuthService.login({
        email: formData.email,
        password: formData.password,
      });

      if (response.success && response.data) {
        await signIn(response.data);
      } else {
        alert(response.message || "Login failed");
      }
    } catch (err) {
      console.error("Sign in failed:", err);
      alert("Login failed. Please try again.");
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = () => {
    signOut();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated && user) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Welcome, {user.name}!</h2>
        <div style={{ marginBottom: "20px" }}>
          <p>
            <strong>User ID:</strong> {user.id}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Roles:</strong>{" "}
            {Array.isArray(user.roles)
              ? user.roles.join(", ")
              : user.roles || "No roles"}
          </p>
          {user.department && (
            <p>
              <strong>Department:</strong> {user.department}
            </p>
          )}
          <p>
            <strong>Authenticated:</strong> {isAuthenticated ? "Yes" : "No"}
          </p>
        </div>
        <button
          onClick={handleSignOut}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Sign In</h2>
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>Error: {error}</div>
      )}

      {/* Demo Users Section */}
      <div
        style={{
          marginBottom: "20px",
          padding: "10px",
          backgroundColor: "#f8f9fa",
          borderRadius: "4px",
          fontSize: "12px",
        }}
      >
        <h4 style={{ margin: "0 0 10px 0", color: "#666" }}>Demo Users:</h4>
        {MockAuthService.getDemoUsers().map((demoUser) => (
          <div key={demoUser.email} style={{ marginBottom: "5px" }}>
            <button
              type="button"
              onClick={() =>
                setFormData({
                  email: demoUser.email,
                  password: demoUser.password,
                })
              }
              style={{
                fontSize: "11px",
                padding: "2px 8px",
                marginRight: "5px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "2px",
                cursor: "pointer",
              }}
            >
              {demoUser.name}
            </button>
            <span style={{ color: "#666" }}>
              {demoUser.email} - {demoUser.roles.join(", ")}
            </span>
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignIn();
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
            placeholder="Enter your email"
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSigningIn}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: isSigningIn ? "#6c757d" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isSigningIn ? "not-allowed" : "pointer",
          }}
        >
          {isSigningIn ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};
