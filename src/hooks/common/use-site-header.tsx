import { useLocation, useNavigate } from "@tanstack/react-router";
import {
  IconChartBar,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconReport,
  IconUsers,
  IconWallet,
  IconTrendingUp,
  IconUsersGroup,
  IconSettings,
  IconHistory,
  IconDashboard,
  IconPill,
} from "@tabler/icons-react";

export type PageAction = {
  label: string;
  description?: string;
  onClick: () => void;
};

export type PageInfo = {
  title: string;
  description: string;
  icon: React.ReactNode;
  action?: PageAction | React.ReactNode;
} | null;

// Type guard to check if action is a PageAction
export const isPageAction = (
  action: PageAction | React.ReactNode | undefined
): action is PageAction => {
  return (
    typeof action === "object" &&
    action !== null &&
    "onClick" in action &&
    "label" in action &&
    typeof (action as PageAction).onClick === "function" &&
    typeof (action as PageAction).label === "string"
  );
};

// Helper function to check if pathname matches a dynamic route pattern
const matchesPattern = (pathname: string, pattern: string): boolean => {
  if (pattern.includes("$")) {
    // Convert route pattern to regex
    // e.g., "/wallets/$walletId/edit" -> /^\/wallets\/[^/]+\/edit$/
    const regexPattern = pattern
      .replace(/\$[^/]+/g, "[^/]+")
      .replace(/\//g, "\\/");
    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(pathname);
  }
  return pathname === pattern;
};

const getPageInfo = (
  pathname: string,
  navigate: ReturnType<typeof useNavigate>
): PageInfo => {
  // Dashboard
  if (pathname === "/") {
    return {
      title: "Dashboard",
      description: "Overview of your system",
      icon: <IconDashboard />,
    };
  }

  // Provider routes
  if (pathname === "/providers") {
    return {
      title: "Provider Management",
      description: "Manage healthcare providers and facilities",
      icon: <IconDatabase />,
      action: {
        label: "Add Provider",
        description: "Add a new provider to the system",
        onClick: () => {
          navigate({
            to: "/providers/create",
            search: { dialog: "create", providerId: undefined },
          });
        },
      },
    };
  }
  if (pathname === "/providers/create") {
    return {
      title: "Create Provider",
      description: "Add a new provider to the system",
      icon: <IconDatabase />,
    };
  }
  if (matchesPattern(pathname, "/providers/$providerId/edit")) {
    return {
      title: "Edit Provider",
      description: "Update provider information",
      icon: <IconDatabase />,
    };
  }

  // User routes
  if (pathname === "/users") {
    return {
      title: "User Management",
      description: "Manage system users and their permissions",
      icon: <IconUsers />,
      action: {
        label: "New User",
        onClick: () => {
          navigate({
            to: "/users/create",
            search: { userType: "MEDSAVE_USER", userId: undefined } as any,
          });
        },
      },
    };
  }
  if (pathname === "/users/create") {
    return {
      title: "Create User",
      description: "Add a new user to the system",
      icon: <IconUsers />,
    };
  }
  if (matchesPattern(pathname, "/users/$userId/edit")) {
    return {
      title: "Edit User",
      description: "Update user information and permissions",
      icon: <IconUsers />,
    };
  }

  // Admin routes
  if (pathname === "/admins") {
    return {
      title: "Admin Management",
      description: "Manage system admins and their permissions",
      icon: <IconUsers />,
      action: {
        label: "New Admin",
        onClick: () => {
          navigate({
            to: "/users/create",
            search: { userType: "IT_OFFICER", userId: undefined } as any,
          });
        },
      },
    };
  }
  if (matchesPattern(pathname, "/admins/$adminId/edit")) {
    return {
      title: "Edit Admin",
      description: "Update admin information and permissions",
      icon: <IconUsers />,
    };
  }

  // Wallet routes
  if (pathname === "/wallets") {
    return {
      title: "Wallet Management",
      description: "Manage user wallets and balances",
      icon: <IconWallet />,
    };
  }
  if (matchesPattern(pathname, "/wallets/$walletId/edit")) {
    return {
      title: "Edit Wallet",
      description: "View and manage wallet details",
      icon: <IconWallet />,
    };
  }

  // Transaction routes
  if (pathname === "/transactions") {
    return {
      title: "Transaction Management",
      description: "View and manage all transactions",
      icon: <IconTrendingUp />,
    };
  }

  // Dependent routes
  if (pathname === "/dependents") {
    return {
      title: "Dependent Oversight",
      description: "Manage user dependents",
      icon: <IconUsersGroup />,
    };
  }

  // Medication routes
  if (pathname === "/medications") {
    return {
      title: "Pharmacy Packages",
      description: "Manage medication packages and inventory",
      icon: <IconPill />,
      action: {
        label: "Add Package",
        onClick: () => {
          navigate({
            to: "/medications/create",
            search: { dialog: "create", medicationId: undefined },
          });
        },
      },
    };
  }
  if (pathname === "/medications/create") {
    return {
      title: "Create Medication Package",
      description: "Add a new medication package",
      icon: <IconPill />,
    };
  }
  if (matchesPattern(pathname, "/medications/$medicationId/edit")) {
    return {
      title: "Edit Medication Package",
      description: "Update medication package information",
      icon: <IconPill />,
    };
  }

  // Claim routes
  if (pathname === "/claims") {
    return {
      title: "Claim Management",
      description: "Manage claims and insurance coverage",
      icon: <IconFileAi />,
      action: {
        label: "Add Claim",
        onClick: () => {
          navigate({
            to: "/claims",
            search: {
              sheet: "create",
              dialog: undefined,
              claimId: undefined,
            },
          });
        },
      },
    };
  }

  // Contribution routes
  if (pathname === "/contributions") {
    return {
      title: "Contribution Management",
      description: "Manage contributions and insurance premiums",
      icon: <IconChartBar />,
      action: {
        label: "Add Contribution",
        onClick: () => {
          navigate({
            to: "/contributions",
            search: {
              sheet: "create",
              dialog: undefined,
              contributionId: undefined,
            },
          });
        },
      },
    };
  }

  // Statement routes
  if (pathname === "/statements") {
    return {
      title: "Statement Management",
      description: "Manage statements and invoices",
      icon: <IconReport />,
      action: {
        label: "Add Statement",
        onClick: () => {
          navigate({
            to: "/statements",
            search: {
              sheet: "create",
              dialog: undefined,
              statementId: undefined,
            },
          });
        },
      },
    };
  }

  // Remittance routes
  if (pathname === "/remittances") {
    return {
      title: "Remittance Management",
      description: "Manage remittances and payments",
      icon: <IconFileDescription />,
      action: {
        label: "Add Remittance",
        onClick: () => {
          navigate({
            to: "/",
          });
        },
      },
    };
  }

  // Settings
  if (pathname === "/settings") {
    return {
      title: "Settings",
      description: "Manage your account settings and preferences",
      icon: <IconSettings />,
    };
  }

  // Audit Log
  if (pathname === "/audit-log") {
    return {
      title: "Audit Log",
      description: "View system activity and audit trail",
      icon: <IconHistory />,
    };
  }

  return null;
};

export const useSiteHeader = (): PageInfo => {
  const location = useLocation();
  const navigate = useNavigate();

  return getPageInfo(location.pathname, navigate);
};
