import axios, { isAxiosError } from "axios";
import { ServiceDefinition } from "./types";
import { Session } from "@/hooks/auth/use-auth";
import { VITE_PUBLIC_BASE_URL } from "./constant";
import { invoke } from "@tauri-apps/api/core";
import { jwtDecode } from "jwt-decode";
import { logger } from "./lib/logger";

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNThiZmM2Zi1hYzZlLTRhOTAtYmNlYy1kOWIyMWQ0MmJlNzkiLCJlbWFpbCI6Im1lZHNhdmUuYWZyaWNhQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsInBlcm1pc3Npb25zIjpbIioiXSwidHlwZSI6ImFkbWluIiwiaWF0IjoxNzY1MzY1OTEwLCJleHAiOjE3NjUzNzMxMTB9.M2oxIU-p_uFfXX_PoY9peOlpmJK8JX6kV6hPBwidH9A";
const index = axios.create({
  baseURL: VITE_PUBLIC_BASE_URL,
  timeout: 10000,
});

const axiosClient = async (config: ServiceDefinition) => {
  const session = (await invoke("get_current_session")) as Session | null;
  const jwt = session?.tokens?.accessToken;

  // logger.info("jwt", jwt);

  return index({
    ...config,
    headers: {
      Authorization: jwt ? `Bearer ${jwt}` : undefined,
      Accept: "application/json",
      "Content-Type": "application/json",
      ...config?.headers,
    },
    params: config?.params,
  });
};

export const queryFn = async <TData, Error = never>(
  config: ServiceDefinition
) => {
  try {
    const response = await axiosClient(config);
    return response.data as TData;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data as Error;
    }
    throw error;
  }
};

index.interceptors.request.use(async (config) => {
  try {
    logger.debug("🔄 [INTERCEPTOR] Checking session for token refresh...");
    const session = (await invoke("get_current_session")) as Session | null;

    if (!session) {
      logger.debug("⚠️ [INTERCEPTOR] No session found");
      return config;
    }

    const accessToken = session?.tokens?.accessToken;
    if (accessToken) {
      logger.debug(
        "🔄 [INTERCEPTOR] Access token found, checking if refresh needed..."
      );
      if (shouldUpdateSession(accessToken)) {
        logger.info(
          "🔄 [INTERCEPTOR] Token refresh needed, calling token_refresh..."
        );
        try {
          const refreshSession = await invoke("token_refresh", {});
          logger.info(
            "✅ [INTERCEPTOR] Successfully refreshed tokens",
            refreshSession
          );

          // Update the session in the request config with new token
          const updatedSession = (await invoke(
            "get_current_session"
          )) as Session | null;
          if (updatedSession?.tokens?.accessToken) {
            config.headers.Authorization = `Bearer ${updatedSession.tokens.accessToken}`;
            logger.debug(
              "✅ [INTERCEPTOR] Updated request with new access token"
            );
          }
        } catch (error) {
          logger.error("❌ [INTERCEPTOR] Failed to refresh token:", error);
          // Don't block the request, just log the error
        }
      } else {
        logger.debug(
          "✅ [INTERCEPTOR] Token is still valid, no refresh needed"
        );
      }
    } else {
      logger.debug("⚠️ [INTERCEPTOR] No access token in session");
    }
  } catch (error) {
    logger.error("❌ [INTERCEPTOR] Error in request interceptor:", error);
  }

  return config;
});

const shouldUpdateSession = (token?: string) => {
  if (!token) return false;
  const decoded = jwtDecode<{ exp: number }>(token);
  const now = Math.floor(Date.now() / 1000);

  logger.debug("now: ", now);
  logger.debug("exp: ", decoded.exp);
  logger.debug("refresh: ", decoded.exp - TOKEN_REFRESH_TIME - now);
  logger.debug("difference: ", decoded.exp - now);

  return now >= decoded?.exp - TOKEN_REFRESH_TIME;
};

const TOKEN_REFRESH_TIME = 60 * 60 * 1 + 60 * 58; // 1 hour 58 minutes in seconds
