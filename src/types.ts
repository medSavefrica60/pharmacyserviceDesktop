import { AxiosRequestHeaders } from "axios";

/**
 * Generic type for API service calls
 */
export type ServiceDefinition<T = unknown> = {
  method: `GET` | `POST` | `PUT` | `DELETE` | `PATCH` | `OPTIONS` | `HEAD`;
  url: string;
  data?: T;
  params?: Record<string, unknown>;
  headers?: AxiosRequestHeaders;
};

export type BaseSuccessResponse<TData> = {
  status: "success";
  code: number;
  message: string;
  timestamp: string;
  requestId: string;
  data: TData;
};

export type BaseFailedResponse<TError = { code: string; message: string }> = {
  status: "error";
  code: number;
  message?: string;
  error: TError;
  timestamp: string;
  requestId: string;
};

/**
 * Verification Document Types
 */
export type VerificationDocumentType =
  | "LICENSE"
  | "REGISTRATION_CERTIFICATE"
  | "TAX_ID"
  | "OTHER";

export type VerificationDocument = {
  id: string;
  size: number;
  type: VerificationDocumentType;
  fileName: string;
  filePath: string;
  verified: boolean;
  uploadedAt: string;
};

/**
 * Provider Status Types
 */
export type ProviderStatus = "ACTIVE" | "PENDING_VERIFICATION" | "SUSPENDED";

/**
 * Provider Type
 */
export type Provider = {
  id: string;
  email: string;
  organizationName: string;
  licenseNumber: string;
  address: string;
  contactPhone: string;
  status: ProviderStatus;
  verificationDocuments: VerificationDocument[];
  emailVerifiedAt: string | null;
  failedLoginAttempts: number;
  lockedUntil: string | null;
  lastLoginAt: string | null;
  lastLoginIp: string | null;
  createdAt: string;
  updatedAt: string;
};

/**
 * Paginated Response Type
 */
export type PaginatedData<T> = {
  providers?: T[];
  users?: T[];
  claims?: T[];
  contributions?: T[];
  medications?: T[];
  packages?: T[];
  statements?: T[];
  dependents?: T[];
  page: number;
  limit: number;
  total: number;
};

/**
 * Providers Response Type
 */
export type ProvidersResponse = BaseSuccessResponse<PaginatedData<Provider>>;
