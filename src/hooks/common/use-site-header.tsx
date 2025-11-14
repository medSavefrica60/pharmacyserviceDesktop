import {
  useLocation,
  useNavigate,
  useParams,
  useSearch,
} from "@tanstack/react-router";
import {
  IconChartBar,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconReport,
  IconUsers,
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

const getPageInfo = (
  pathname: string,
  navigate: ReturnType<typeof useNavigate>
): PageInfo => {
  switch (pathname) {
    case "/providers":
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
    case "/providers/create":
      return {
        title: "Create Provider",
        description: "Add a new provider to the system",
        icon: <IconDatabase />,
        action: {
          label: "View Providers",
          onClick: () => {
            navigate({
              to: "/providers",
              search: { dialog: "create", providerId: undefined },
            });
          },
        },
      };
    case "/users":
      return {
        title: "User Management",
        description: "Manage system users and their permissions",
        icon: <IconUsers />,
        action: {
          label: "Add User",
          onClick: () => {
            navigate({
              to: "/users/create",
              search: { dialog: "create", userId: undefined },
            });
          },
        },
      };
    case "/users/create":
      return {
        title: "Create User",
        description: "Add a new user to the system",
        icon: <IconUsers />,
        action: {
          label: "View Users",
          onClick: () => {
            navigate({
              to: "/users",
              search: { dialog: undefined, userId: undefined },
            });
          },
        },
      };
    case "/medications":
      return {
        title: "Pharmacy Packages",
        description: "Manage medication packages and inventory",
        icon: <IconFileDescription />,
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
    case "/claims":
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
    case "/contributions":
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
    case "/statements":
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
    case "/remittances":
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
    default:
      return null;
  }
};

export const useSiteHeader = (): PageInfo => {
  const location = useLocation();
  const navigate = useNavigate();

  return getPageInfo(location.pathname, navigate);
};
