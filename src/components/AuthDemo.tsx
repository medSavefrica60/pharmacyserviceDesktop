import React from "react";
import {
  useAuth,
  usePermissions,
  ProtectedRoute,
  getUserInitials,
  getDisplayName,
} from "@/lib/auth";

export const AuthDemo: React.FC = () => {
  const { user, isAuthenticated, refreshToken, updateUser, clearError, error } =
    useAuth();
  const { hasRole, hasAnyRole } = usePermissions();

  const handleRefreshToken = async () => {
    const success = await refreshToken();
    if (success) {
      alert("Token refreshed successfully!");
    } else {
      alert("Token refresh failed!");
    }
  };

  const handleUpdateProfile = () => {
    if (user) {
      updateUser({
        name: `${user.name} (Updated)`,
        lastUpdated: new Date().toISOString(),
      });
      alert("Profile updated!");
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Authentication Features Demo</h3>

      {error && (
        <div
          style={{
            color: "red",
            backgroundColor: "#ffe6e6",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "4px",
          }}
        >
          Error: {error}
          <button
            onClick={clearError}
            style={{ marginLeft: "10px", fontSize: "12px" }}
          >
            Clear
          </button>
        </div>
      )}

      {/* User Profile Card */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "15px",
          marginBottom: "20px",
          backgroundColor: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#007bff",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "10px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            {getUserInitials(user)}
          </div>
          <div>
            <h4 style={{ margin: 0 }}>{getDisplayName(user)}</h4>
            <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
              {user?.email}
            </p>
          </div>
        </div>

        {user?.department && (
          <p>
            <strong>Department:</strong> {user.department}
          </p>
        )}

        <div style={{ marginTop: "10px" }}>
          <button
            onClick={handleUpdateProfile}
            style={{
              padding: "5px 15px",
              marginRight: "10px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Update Profile
          </button>

          <button
            onClick={handleRefreshToken}
            style={{
              padding: "5px 15px",
              backgroundColor: "#17a2b8",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Refresh Token
          </button>
        </div>
      </div>

      {/* Role-based Access Demo */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "15px",
          marginBottom: "20px",
        }}
      >
        <h4>Role-based Access Control</h4>
        <p>
          <strong>Your Roles:</strong>{" "}
          {Array.isArray(user?.roles)
            ? user.roles.join(", ")
            : user?.roles || "None"}
        </p>

        <div style={{ marginTop: "15px" }}>
          {hasRole("admin") && (
            <div
              style={{
                padding: "10px",
                backgroundColor: "#d4edda",
                borderRadius: "4px",
                marginBottom: "10px",
              }}
            >
              🔧 <strong>Admin Panel:</strong> You have admin access! You can
              manage users and system settings.
            </div>
          )}

          {hasRole("manager") && (
            <div
              style={{
                padding: "10px",
                backgroundColor: "#cce5ff",
                borderRadius: "4px",
                marginBottom: "10px",
              }}
            >
              👔 <strong>Manager Dashboard:</strong> You can view reports and
              manage your team.
            </div>
          )}

          {hasAnyRole(["admin", "manager"]) && (
            <div
              style={{
                padding: "10px",
                backgroundColor: "#fff3cd",
                borderRadius: "4px",
                marginBottom: "10px",
              }}
            >
              📊 <strong>Analytics:</strong> You have access to advanced
              analytics.
            </div>
          )}

          {hasRole("guest") && (
            <div
              style={{
                padding: "10px",
                backgroundColor: "#f8d7da",
                borderRadius: "4px",
                marginBottom: "10px",
              }}
            >
              👤 <strong>Guest Access:</strong> You have limited access to the
              application.
            </div>
          )}
        </div>
      </div>

      {/* Protected Content Examples */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "15px",
        }}
      >
        <h4>Protected Content Examples</h4>

        <ProtectedRoute requiredRole="admin">
          <div
            style={{
              padding: "10px",
              backgroundColor: "#d4edda",
              borderRadius: "4px",
              marginBottom: "10px",
            }}
          >
            ⚙️ This content is only visible to admins!
          </div>
        </ProtectedRoute>

        <ProtectedRoute requiredRoles={["admin", "manager"]}>
          <div
            style={{
              padding: "10px",
              backgroundColor: "#cce5ff",
              borderRadius: "4px",
              marginBottom: "10px",
            }}
          >
            📈 This content is visible to admins and managers only!
          </div>
        </ProtectedRoute>

        <ProtectedRoute requiredRole="guest">
          <div
            style={{
              padding: "10px",
              backgroundColor: "#f8d7da",
              borderRadius: "4px",
              marginBottom: "10px",
            }}
          >
            👋 This is guest-only content!
          </div>
        </ProtectedRoute>

        <div
          style={{
            padding: "10px",
            backgroundColor: "#e9ecef",
            borderRadius: "4px",
          }}
        >
          📖 This content is visible to all authenticated users!
        </div>
      </div>
    </div>
  );
};
