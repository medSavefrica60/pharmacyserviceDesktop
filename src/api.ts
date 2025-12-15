import axios, { isAxiosError } from "axios";
import { ServiceDefinition } from "./types";
import { Session } from "@/hooks/auth/use-auth";
import { VITE_PUBLIC_BASE_URL } from "./constant";
import { invoke } from "@tauri-apps/api/core";
import { jwtDecode } from "jwt-decode";

const index = axios.create({
  baseURL: VITE_PUBLIC_BASE_URL,
  timeout: 10000,
});

const axiosClient = async (config: ServiceDefinition) => {
  const jwt = await decideToken();

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

async function decideToken() {
  const session = (await invoke("get_current_session")) as Session | null;
  const accessToken = localStorage.getItem("accessToken");
  if (session) {
    return session.tokens.accessToken;
  }

  return accessToken;
}

index.interceptors.request.use(async (config) => {
  try {
    const session = (await invoke("get_current_session")) as Session | null;

    if (!session) {
      return config;
    }

    const accessToken = session?.tokens?.accessToken;
    if (accessToken) {
      if (shouldUpdateSession(accessToken)) {
        try {
          await invoke("token_refresh", {});
          // Update the session in the request config with new token
          const updatedSession = (await invoke(
            "get_current_session"
          )) as Session | null;
          if (updatedSession?.tokens?.accessToken) {
            config.headers.Authorization = `Bearer ${updatedSession.tokens.accessToken}`;
          }
        } catch (error) {
          // Don't block the request, just log the error
        }
      }
    }
  } catch (error) {}

  return config;
});

const shouldUpdateSession = (token?: string) => {
  if (!token) return false;
  const decoded = jwtDecode<{ exp: number }>(token);
  const now = Math.floor(Date.now() / 1000);

  return now >= decoded?.exp - TOKEN_REFRESH_TIME;
};

const TOKEN_REFRESH_TIME = 60 * 5; // 5 minutes in seconds
