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
export type SubscribedPackage = {
  id: string;
  name: string;
  minAmount: number;
  description: string | null;
  status: string;
};

export type PaymentBankInfo = {
  bankName: string;
  swiftCode: string;
  accountType: string;
  accountNumber: string;
  accountHolderName: string;
};

export type PaymentMomoInfo = {
  provider: string;
  momoNumber: string;
  accountType: string;
  accountHolderName: string;
};

export type PaymentInformation = {
  bank: PaymentBankInfo | null;
  momo: PaymentMomoInfo | null;
};

export type Provider = {
  id: string;
  email: string;
  organizationName: string;
  licenseNumber: string;
  address: string;
  contactPhone: string;
  status: ProviderStatus;
  logo?: string | null;
  verificationDocuments: VerificationDocument[];
  emailVerifiedAt: string | null;
  failedLoginAttempts: number;
  lockedUntil: string | null;
  lastLoginAt: string | null;
  lastLoginIp: string | null;
  createdAt: string;
  updatedAt: string;
  subscribedPackages?: SubscribedPackage[];
  paymentInformation?: PaymentInformation;
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
  page: number;
  limit: number;
  total: number;
  metadata?: {
    totalProviders?: number;
    activeProviders?: number;
    pendingVerificationProviders?: number;
    suspendedProviders?: number;
    totalMedications?: number;
    activeMedications?: number;
    inactiveMedications?: number;
    suspendedMedications?: number;
    totalContributions?: number;
    completedContributions?: number;
    pendingContributions?: number;
    failedContributions?: number;
    totalContributionAmount?: number;
  };
};

/**
 * Providers Response Type
 */
export type ProvidersResponse = BaseSuccessResponse<PaginatedData<Provider>>;

/**
 * Medication Status Types
 */
export type MedicationStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

/**
 * Medication Type
 */
export type Medication = {
  id: string;
  name: string;
  description?: string;
  minAmount: number;
  status: MedicationStatus;
  isActive: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

/**
 * Medications Response Type
 */
export type MedicationsResponse = BaseSuccessResponse<
  PaginatedData<Medication>
>;

/**
 * Package Type (same structure as Medication)
 */
export type Package = Medication;

/**
 * Packages Response Type
 */
export type PackagesResponse = BaseSuccessResponse<{
  packages: Package[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}>;

/**
 * User Types
 */
export type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";
export type UserRole = "END_USER" | "ADMIN" | "SUPER_ADMIN";
export type UserChannel = "USSD" | "WEB" | "MOBILE";
export type UserGender = "MALE" | "FEMALE" | "OTHER" | "";

export type User = {
  id: string;
  ghanaCardNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: UserGender;
  channel: UserChannel;
  status: UserStatus;
  role: UserRole;
  isPinSet: boolean;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  ghanaCardVerified: boolean;
  isMomoNumber: boolean;
  momoNumber: string;
  termsAccepted: boolean;
  trustScore: number;
  failedLoginAttempts: number;
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
};

export type Admin = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: "SUPER_ADMIN" | "ADMIN";
  status: UserStatus;
  permissions: string[];
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
};

/**
 * Users Response Type (different structure - pagination at root level)
 */
export type UsersResponse = BaseSuccessResponse<{ users: User[] }> & {
  limit: number;
  totalPages: number;
  currentPage: number;
  total: number;
};

/**
 * Admins Response Type
 */
export type AdminsResponse = BaseSuccessResponse<{
  admins: Admin[];
  total: number;
  page: number;
  limit: number;
}>;

/**
 * Claim Types - Updated for new API structure
 */
export type ClaimStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "expired"
  | "cancelled";

export type Claim = {
  id: string;
  amount: string;
  status: ClaimStatus;
  reference: string;
  claimCode: string;
  expiresAt: string | null;
  approvedAt: string | null;
  createdAt: string;
  updatedAt: string;
  metadata: any | null;
  user: {
    id: string;
    medsaveId: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string | null;
  };
  provider: {
    id: string;
    organizationName: string;
    email: string;
    contactPhone: string;
    status: string;
  };
  package: {
    id: string;
    name: string;
    minAmount: string;
    status: string;
  };
};

/**
 * Claims Response Type (pagination in data object)
 */
export type ClaimsResponse = BaseSuccessResponse<{
  page: number;
  limit: number;
  total: number;
  claims: Claim[];
}>;

/**
 * Provider Claim Types - Extended claim with full user and provider data
 */
export type ProviderClaim = {
  id: string;
  userId: string;
  providerId: string;
  packageId: string;
  amount: string;
  status: string;
  reference: string;
  claimCode: string;
  approvedBy: string | null;
  expiresAt: string | null;
  approvedAt: string | null;
  metadata: any | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user: {
    id: string;
    ghanaCardNumber: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string | null;
    gender: UserGender | null;
    phoneNumber: string;
    email: string | null;
    channel: UserChannel;
    passwordHash: string;
    isPinSet: boolean;
    isPhoneVerified: boolean;
    isEmailVerified: boolean;
    ghanaCardVerified: boolean;
    isMomoNumber: boolean;
    momoNumber: string | null;
    termsAccepted: boolean;
    role: UserRole;
    status: UserStatus;
    failedLoginAttempts: number;
    lockedUntil: string | null;
    lastLoginAt: string | null;
    phoneVerificationToken: string | null;
    emailVerificationToken: string | null;
    pinResetToken: string | null;
    pinResetExpires: string | null;
    securityQuestions: any | null;
    preferredLanguage: string;
    notificationPreferences: any | null;
    receivePromotions: boolean;
    momoLinkingOTP: string | null;
    momoLinkingOTPExpires: string | null;
    momoLinkingRequestId: string | null;
    medsaveId: string;
    trustScore: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
  provider: {
    id: string;
    email: string;
    organizationName: string;
    licenseNumber: string;
    address: string;
    contactPhone: string;
    passwordHash: string;
    status: ProviderStatus;
    verificationDocuments: VerificationDocument[];
    emailVerificationToken: string | null;
    emailVerifiedAt: string | null;
    failedLoginAttempts: number;
    lockedUntil: string | null;
    lastLoginAt: string | null;
    lastLoginIp: string | null;
    refreshToken: string | null;
    passwordResetToken: string | null;
    passwordResetExpiresAt: string | null;
    createdAt: string;
    updatedAt: string;
  };
};

/**
 * Provider Claims Response Type
 */
export type ProviderClaimsResponse = BaseSuccessResponse<{
  claims: ProviderClaim[];
  page: number;
  limit: number;
  total: number;
}>;

/**
 * User Package Enrollment Types
 */
export type UserPackageEnrollment = {
  id: string;
  packageId: string;
  packageName: string;
  balance: number;
  totalContributions: number;
  totalDeposits: number;
  totalClaims: number;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  enrolledAt: string;
  lastTransactionAt: string;
};

/**
 * User Package Enrollments Response Type
 */
export type UserPackageEnrollmentsResponse = BaseSuccessResponse<{
  packages: UserPackageEnrollment[];
  total: number;
}>;

/**
 * Dependent Status Types
 */
export type DependentStatus = "active" | "inactive";

/**
 * Dependent Type
 */
export type Dependent = {
  id: string;
  dependentPhone: string;
  dependentName: string;
  relationship: string;
  status: DependentStatus;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
};

/**
 * Dependents Response Type
 */
export type DependentsResponse = BaseSuccessResponse<{
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  dependents: Dependent[];
}>;

/**
 * Audit Log Types
 */
export type AuditLogAdmin = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

export type AuditLogMetadata = {
  page?: number;
  limit?: number;
  walletId?: string;
  userId?: string;
  newStatus?: string;
  reason?: string;
  status?: string;
  filters?: Record<string, unknown>;
  resultCount?: number;
  total?: number;
  [key: string]: unknown;
};

export type AuditLog = {
  id: string;
  action: string;
  adminId: string;
  targetUserId: string | null;
  targetResourceId: string | null;
  targetResourceType: string | null;
  description: string;
  oldValues: Record<string, unknown> | null;
  newValues: Record<string, unknown> | null;
  metadata: AuditLogMetadata | null;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
  admin: AuditLogAdmin;
};

export type AuditLogsResponse = BaseSuccessResponse<{
  auditLogs: AuditLog[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}>;

/**
 * Wallet Status Types
 */
export type WalletStatus = "ACTIVE" | "SUSPENDED";

/**
 * Wallet Type
 */
export type Wallet = {
  id: string;
  userId: string;
  balance: string;
  currency: string;
  status: WalletStatus;
  isMomoLinked: boolean;
  mobileMoneyNumber: string | null;
  mobileMoneyProvider: string | null;
  dailyLimit: string;
  monthlyLimit: string;
  lastTransactionAt: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
};

/**
 * Wallets Response Type
 */
export type WalletsResponse = BaseSuccessResponse<{
  wallets: Wallet[];
}> & {
  limit: number;
  totalPages: number;
  currentPage: number;
  total: number;
  metadata?: {
    totalWallets?: number;
    activeWallets?: number;
    inactiveWallets?: number;
    suspendedWallets?: number;
    momoLinkedWallets?: number;
    totalBalance?: number;
  };
};

/**
 * Transaction Status Types
 */
export type TransactionStatus =
  | "pending"
  | "completed"
  | "failed"
  | "cancelled";

/**
 * Transaction Type
 */
export type TransactionType = "DEPOSIT" | "WITHDRAWAL" | "TRANSFER";

/**
 * Transaction Type
 */
export type Transaction = {
  id: string;
  transactionType: TransactionType;
  amount: string;
  status: TransactionStatus | string;
  description: string;
  referenceNumber: string;
  externalReference: string | null;
  metadata: any | null;
  failureReason: string | null;
  processedAt: string | null;
  failedAt: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string | null;
    phoneNumber: string;
  };
  wallet: {
    id: string;
    userId: string;
  };
};

/**
 * Transactions Response Type
 */
export type TransactionsResponse = BaseSuccessResponse<{
  transactions: Transaction[];
}> & {
  limit: number;
  totalPages: number;
  currentPage: number;
  total: number;
  metadata?: {
    totalTransactions?: number;
    completedTransactions?: number;
    pendingTransactions?: number;
    failedTransactions?: number;
    totalAmount?: number;
  };
};
