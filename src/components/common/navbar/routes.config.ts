import type { LucideIcon } from "lucide-react";
import {
  IconDashboard,
  IconUsersGroup,
  IconUser,
  IconBuildingHospital,
  IconShield,
  IconPlus,
  IconEye,
  IconWallet,
  IconArrowsExchange,
  IconUserHeart,
  IconPackage,
  IconPill,
  IconFlask,
  IconFileText,
  IconCoins,
  IconReceipt,
  IconSend,
  IconSettings,
  IconHistory,
  IconLogout,
} from "@tabler/icons-react";

// Support both Lucide and Tabler icons (both are React components)
type IconType = LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;

export interface RouteItemWithOptionalIcon {
  title: string;
  url: string;
  icon?: IconType;
}

export interface RouteItem {
  title: string;
  url: string;
  icon: IconType;
}

export interface DocumentItem {
  name: string;
  url: string;
  icon: IconType;
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
      title: "User Management",
      url: "/users",
      icon: IconUsersGroup,
      isActive: true,
      items: [
        {
          title: "MedSave Users",
          url: "/users",
          icon: IconUser,
        },
        {
          title: "MedSave Providers",
          url: "/providers",
          icon: IconBuildingHospital,
        },
        {
          title: "MedSave Admins",
          url: "/admins",
          icon: IconShield,
        },
        {
          title: "New User",
          url: "/users/create",
          icon: IconPlus,
        },
      ],
    },
    // {
    //   title: "Provider Management",
    //   url: "/providers",
    //   icon: Building2,
    //   isActive: true,
    //   items: [
    //     {
    //       title: "View Providers",
    //       url: "/providers",
    //       icon: Eye,
    //     },
    //     {
    //       title: "Add Provider",
    //       url: "/providers/create",
    //       icon: Plus,
    //     },
    //   ],
    // },
    {
      title: "Wallet Management",
      url: "/wallets",
      icon: IconWallet,
      isActive: true,
    },
    {
      title: "Transaction Management",
      url: "/transactions",
      icon: IconArrowsExchange,
      isActive: true,
    },
    {
      title: "Dependent Oversight",
      url: "/dependents",
      icon: IconUserHeart,
      isActive: true,
      items: [
        {
          title: "View Dependents",
          url: "/dependents",
          icon: IconEye,
        },
      ],
    },
    {
      title: "Package Management",
      url: "/packages",
      icon: IconPackage,
      isActive: true,
      items: [
        {
          title: "Pharmacy Packages",
          url: "/medications",
          icon: IconPill,
          isActive: true,
        },
        {
          title: "Laboratory Packages",
          url: "/laboratory-packages",
          icon: IconFlask,
        },
        {
          title: "Hospital Packages",
          url: "/hospital-packages",
          icon: IconBuildingHospital,
        },
      ],
    },
    {
      title: "Claim Management",
      url: "/claims",
      icon: IconFileText,
      isActive: true,
      items: [
        {
          title: "View Claims",
          url: "/claims",
          icon: IconEye,
        },
      ],
    },
    {
      title: "Contribution Management",
      url: "/contributions",
      icon: IconCoins,
      isActive: true,
      items: [
        {
          title: "View Contributions",
          url: "/contributions",
          icon: IconEye,
        },
      ],
    },

    {
      title: "Statement Management",
      url: "/statements",
      icon: IconReceipt,
      isActive: true,
      items: [
        {
          title: "View Statements",
          url: "/statements",
          icon: IconEye,
        },
      ],
    },
    {
      title: "Remittances",
      url: "/remittances",
      icon: IconSend,
      isActive: true,
      items: [
        {
          title: "View Remittances",
          url: "/remittances",
          icon: IconEye,
        },
      ],
    },
  ] as RouteItemWithOptionalIcon[],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Audit Log",
      url: "/audit-log",
      icon: IconHistory,
    },
    {
      title: "Logout",
      url: "/logout",
      icon: IconLogout,
    },
  ] as RouteItem[],
  documents: [],
};
