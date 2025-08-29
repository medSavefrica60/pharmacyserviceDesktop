import { useState } from "react";
import { useAuth } from "@/lib/auth";

export default function App() {
  return <SignInComponent />;
}

export const SignInComponent = () => {
  const { error } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async () => {
    if (!formData.email || !formData.password) {
      alert("Please fill in both email and password");
      return;
    }

    setIsSigningIn(true);

    try {
      // });
    } catch (err: any) {
      console.error("Sign in failed:", err);
      const errorMessage = err?.message || "Login failed. Please try again.";
      alert(errorMessage);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Sign In</h2>
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>Error: {error}</div>
      )}

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
