import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  IconChartBar,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconReport,
  IconUsers,
} from "@tabler/icons-react";
import {
  ParsedLocation,
  useLocation,
  useNavigate,
  UseNavigateResult,
} from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";

export function SiteHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const pageInfo = getPageInfo(location, navigate);

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 py-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
        </div>
        <div className="flex items-center gap-2 flex-1 justify-between">
          <div>
            <span className="text-lg font-medium">{pageInfo?.title}</span>
            <p className="text-sm text-muted-foreground">
              {pageInfo?.description}
            </p>
          </div>
          <Button
            onClick={() => pageInfo?.button?.onClick()}
            className="flex items-center rounded-sm bg-medsave-blue-500"
            size={`default`}
            variant={`default`}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            {pageInfo?.button?.label}
          </Button>
        </div>
      </div>
    </header>
  );
}

const getPageInfo = (
  location: ParsedLocation<any>,
  navigate: UseNavigateResult<string>
) => {
  switch (location.pathname) {
    case "/providers":
      return {
        title: "Provider Management",
        description: "Manage healthcare providers and facilities",
        icon: <IconDatabase />,
        button: {
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
        button: {
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
        button: {
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
        button: {
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
        title: "Medication Management",
        description: "Manage medication packages and inventory",
        icon: <IconFileDescription />,
        button: {
          label: "Add Medication",
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
        button: {
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
        button: {
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
    case "/packages":
      return {
        title: "Package Management",
        description: "Manage medication packages and inventory",
        icon: <IconFileDescription />,
        button: {
          label: "Add Package",
          onClick: () => {
            navigate({
              to: "/packages",
              search: {
                sheet: "create",
                dialog: undefined,
                packageId: undefined,
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
        button: {
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
        button: {
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
