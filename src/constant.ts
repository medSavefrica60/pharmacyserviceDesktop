if (!import.meta.env.VITE_PUBLIC_BASE_URL) {
  throw new Error("VITE_PUBLIC_BASE_URL environment variable is required");
}
export const VITE_PUBLIC_BASE_URL = import.meta.env.VITE_PUBLIC_BASE_URL;

if (!import.meta.env.VITE_AUTH_SECRET) {
  console.warn(
    "Warning: VITE_AUTH_SECRET environment variable is not set. Using default value."
  );
}
export const AUTH_SECRET =
  import.meta.env.VITE_AUTH_SECRET || "default_auth_secret";

export const publicRoutes = [
  "/auth/sign-in",
  "/auth/sign-up",
  "/auth/verify-request",
  "/auth/verify-partner",
  "/auth/forgot-password",
];

export enum AppRoutes {
  SIGNUP = "/auth/sign-up",
  PARTNER_EMAIL_VERIFICATION = "/auth/verify-partner",
  SIGNIN = "/auth/sign-in",
  FORGOT_PASSWORD = "/auth/forgot-password",

  // internal routes

  HOME = "/",
  CLAIM = "/claims",
  PATIENTS = "/patients",
  REMITTANCE = "/remittance",
  USER_MNGT = "/user-management",
  ACTIVITY_LOG = "/activity-log",
  HELP = "/help",
  ONBOARDING_ACCOUNT_SETUP = "/onboarding/account",
}

export const ghanaPhonePrefixes = [
  "020",
  "021",
  "024",
  "025",
  "026",
  "027",
  "028",
  "050",
  "054",
  "055",
  "056",
  "057",
  "059",
  "053",
] as const;

export const DEFAULT_PAGE_SIZE = 5;
export const DEFAULT_PAGE_INDEX = 1;
