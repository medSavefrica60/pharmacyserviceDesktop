import {
  LayoutDashboard,
  Users,
  Building2,
  UsersRound,
  Pill,
  FileText,
  TrendingUp,
  Package,
  Receipt,
  Send,
  Plus,
  Eye,
  type LucideIcon,
  Settings,
} from "lucide-react";

export interface RouteItemWithOptionalIcon {
  title: string;
  url: string;
  icon?: LucideIcon;
}

export interface RouteItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

export interface DocumentItem {
  name: string;
  url: string;
  icon: LucideIcon;
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
      icon: LayoutDashboard,
    },
    {
      title: "Users",
      url: "/users",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "View Users",
          url: "/users",
          icon: Eye,
        },
        {
          title: "Add User",
          url: "/users/create",
          icon: Plus,
        },
      ],
    },
    {
      title: "Providers",
      url: "/providers",
      icon: Building2,
      isActive: true,
      items: [
        {
          title: "View Providers",
          url: "/providers",
          icon: Eye,
        },
        {
          title: "Add Provider",
          url: "/providers/create",
          icon: Plus,
        },
      ],
    },
    {
      title: "Dependent Oversight",
      url: "/dependents",
      icon: UsersRound,
    },
    {
      title: "Medication",
      url: "/medications",
      icon: Pill,
      isActive: true,
      items: [
        {
          title: "View Medications",
          url: "/medications",
          icon: Eye,
        },
        {
          title: "Add Medication",
          url: "/medications/create",
          icon: Plus,
        },
      ],
    },
    {
      title: "Claims",
      url: "/claims",
      icon: FileText,
      isActive: true,
      items: [
        {
          title: "View Claims",
          url: "/claims",
          icon: Eye,
        },
        {
          title: "Add Claim",
          url: "/claims/create",
          icon: Plus,
        },
      ],
    },
    {
      title: "Contributions",
      url: "/contributions",
      icon: TrendingUp,
      isActive: true,
      items: [
        {
          title: "View Contributions",
          url: "/contributions",
          icon: Eye,
        },
      ],
    },

    {
      title: "Statements",
      url: "/statements",
      icon: Receipt,
      isActive: true,
      items: [
        {
          title: "View Statements",
          url: "/statements",
          icon: Eye,
        },
      ],
    },
    {
      title: "Remittances",
      url: "/remittances",
      icon: Send,
      isActive: true,
      items: [
        {
          title: "View Remittances",
          url: "/remittances",
          icon: Eye,
        },
      ],
    },
  ] as RouteItemWithOptionalIcon[],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ] as RouteItem[],
  documents: [],
};
