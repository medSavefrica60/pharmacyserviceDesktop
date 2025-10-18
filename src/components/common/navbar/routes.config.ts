import {
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFolder,
  IconListDetails,
  IconReport,
  IconUsers,
  type Icon,
} from "@tabler/icons-react";

export interface RouteItemWithOptionalIcon {
  title: string;
  url: string;
  icon?: Icon;
}

export interface RouteItem {
  title: string;
  url: string;
  icon: Icon;
}

export interface DocumentItem {
  name: string;
  url: string;
  icon: Icon;
}

export interface RouteConfig {
  navMain: RouteItemWithOptionalIcon[];
  navSecondary: RouteItem[];
  documents: DocumentItem[];
}

/**
 * Centralized route configuration for the application
 * Modify these routes to change navigation structure throughout the app
 */
export const routesConfig: RouteConfig = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "Users",
      url: "/users",
      icon: IconUsers,
    },
    {
      title: "Providers",
      url: "/providers",
      icon: IconDatabase,
    },
    {
      title: "Dependent Oversight",
      url: "/dependents",
      icon: IconListDetails,
    },
    {
      title: "Medication",
      url: "/medications",
      icon: IconFileDescription,
    },
    {
      title: "Claims",
      url: "/claims",
      icon: IconFileAi,
    },
    {
      title: "Contributions",
      url: "/contributions",
      icon: IconChartBar,
    },
    {
      title: "Packages",
      url: "/packages",
      icon: IconFolder,
    },
    {
      title: "Statements",
      url: "/statements",
      icon: IconReport,
    },
    {
      title: "Remittances",
      url: "/remittances",
      icon: IconFileDescription,
    },
  ] as RouteItemWithOptionalIcon[],
  navSecondary: [] as RouteItem[],
  documents: [],
};
