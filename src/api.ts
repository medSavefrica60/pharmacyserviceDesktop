import axios, { isAxiosError } from "axios";
import { ServiceDefinition } from "./types";
// import { invoke } from "@tauri-apps/api/core";
// import { Session } from "@/hooks/auth/use-auth";
// import { logger } from "./lib/logger";
import { VITE_PUBLIC_BASE_URL } from "./constant";
import { logger } from "./lib/logger";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNThiZmM2Zi1hYzZlLTRhOTAtYmNlYy1kOWIyMWQ0MmJlNzkiLCJlbWFpbCI6Im1lZHNhdmUuYWZyaWNhQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsInBlcm1pc3Npb25zIjpbIioiXSwidHlwZSI6ImFkbWluIiwiaWF0IjoxNzYzMTM5NDQ4LCJleHAiOjE3NjMxNDY2NDh9.AKP-pgo6zwYZIQFl5KKdTTRvITNLloXfwKwJ9IeskmU";
const index = axios.create({
  baseURL: VITE_PUBLIC_BASE_URL,
  timeout: 10000,
});

const axiosClient = async (config: ServiceDefinition) => {
  // const session = (await invoke("get_current_session")) as Session | null;
  // const jwt = session?.tokens?.accessToken;

  // logger.info("jwt", jwt);

  return index({
    ...config,
    headers: {
      // Authorization: jwt ? `Bearer ${jwt}` : undefined,
      Authorization: `Bearer ${token}`,
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
    // logger.info(`queryFn: Starting request for: ${config.url}`);
    const response = await axiosClient(config);
    // logger.info(`queryFn: Response status: ${response.status}`);
    // logger.info(`queryFn: Response data: ${response.data}`);
    return response.data as TData;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data as Error;
    }
    throw error;
  }
};
