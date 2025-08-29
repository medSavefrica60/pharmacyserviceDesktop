import React from "react";
import { useTokenRefreshInfo } from "@/lib/auth";

export const TokenDebugInfo: React.FC = () => {
  const refreshInfo = useTokenRefreshInfo();

  if (!refreshInfo) {
    return (
      <div
        style={{
          padding: "10px",
          backgroundColor: "#f8f9fa",
          borderRadius: "4px",
          fontSize: "12px",
          marginTop: "10px",
        }}
      >
        <strong>Token Info:</strong> Not authenticated
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: refreshInfo.isExpired ? "#f8d7da" : "#d4edda",
        borderRadius: "4px",
        fontSize: "12px",
        marginTop: "10px",
        border: `1px solid ${refreshInfo.isExpired ? "#dc3545" : "#28a745"}`,
      }}
    >
      <h4 style={{ margin: "0 0 8px 0", fontSize: "14px" }}>
        🔄 Token Refresh Status
      </h4>

      <div style={{ marginBottom: "5px" }}>
        <strong>Expires:</strong> {refreshInfo.expiresAt.toLocaleString()}
      </div>

      <div style={{ marginBottom: "5px" }}>
        <strong>Refresh At:</strong> {refreshInfo.refreshAt.toLocaleString()}
      </div>

      <div style={{ marginBottom: "5px" }}>
        <strong>Minutes until expiry:</strong>
        <span
          style={{
            color: refreshInfo.minutesUntilExpiry <= 5 ? "#dc3545" : "#28a745",
            fontWeight: "bold",
            marginLeft: "5px",
          }}
        >
          {refreshInfo.minutesUntilExpiry}
        </span>
      </div>

      <div style={{ marginBottom: "5px" }}>
        <strong>Minutes until refresh:</strong>
        <span
          style={{
            color: refreshInfo.minutesUntilRefresh <= 1 ? "#fd7e14" : "#6c757d",
            fontWeight: "bold",
            marginLeft: "5px",
          }}
        >
          {refreshInfo.minutesUntilRefresh}
        </span>
      </div>

      <div>
        <strong>Status:</strong>
        <span
          style={{
            color: refreshInfo.isExpired
              ? "#dc3545"
              : refreshInfo.shouldRefreshNow
                ? "#fd7e14"
                : "#28a745",
            fontWeight: "bold",
            marginLeft: "5px",
          }}
        >
          {refreshInfo.isExpired
            ? "🔴 Expired"
            : refreshInfo.shouldRefreshNow
              ? "🟡 Refresh Due"
              : "🟢 Active"}
        </span>
      </div>
    </div>
  );
};
