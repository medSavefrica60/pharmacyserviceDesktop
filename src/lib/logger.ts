import { invoke } from "@tauri-apps/api/core";

// Custom logger that sends logs to Rust backend
export const logger = {
  debug: (message: string, data?: any) => {
    const logMessage = data ? `${message}: ${JSON.stringify(data)}` : message;
    console.log(`🔍 [FRONTEND DEBUG] ${logMessage}`);
    // Also send to Rust backend for terminal logging
    invoke("log_debug", { message: logMessage }).catch(() => {
      // Ignore if the command doesn't exist yet
    });
  },

  info: (message: string, data?: any) => {
    const logMessage = data ? `${message}: ${JSON.stringify(data)}` : message;
    console.log(`ℹ️ [FRONTEND INFO] ${logMessage}`);
    invoke("log_info", { message: logMessage }).catch(() => {});
  },

  error: (message: string, data?: any) => {
    const logMessage = data ? `${message}: ${JSON.stringify(data)}` : message;
    console.error("❌ [FRONTEND ERROR] ", logMessage);
    invoke("log_error", { message: logMessage }).catch(() => {});
  },

  warn: (message: string, data?: any) => {
    const logMessage = data ? `${message}: ${JSON.stringify(data)}` : message;
    console.warn("⚠️ [FRONTEND WARN] ", logMessage);
    invoke("log_warn", { message: logMessage }).catch(() => {});
  },
};
