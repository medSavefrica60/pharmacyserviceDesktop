import axios, { isAxiosError } from "axios";
import { ServiceDefinition } from "./types";
import { invoke } from "@tauri-apps/api/core";
import { Session } from "@/hooks/auth/use-auth";

const index = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BASE_URL,
  timeout: 10000,
});

const axiosClient = async (config: ServiceDefinition) => {
  const session = (await invoke("get_current_session")) as Session | null;
  console.log("session", session);
  const jwt = session?.tokens?.accessToken;

  console.log("jwt", jwt);

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
