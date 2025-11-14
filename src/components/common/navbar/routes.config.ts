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
  FlaskRound,
} from "lucide-react";
import { HospitalSVG, LaboratorySVG, PharmacySVG } from "../icons";
import { IconHospital } from "@tabler/icons-react";

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
      title: "User Management",
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
      title: "Provider Management",
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
      isActive: true,
      items: [
        {
          title: "View Dependents",
          url: "/dependents",
          icon: Eye,
        },
      ],
    },
    {
      title: "Package Management",
      url: "/packages",
      icon: Package,
      isActive: true,
      items: [
        {
          title: "Pharmacy Packages",
          url: "/medications",
          icon: Pill,
          isActive: true,
        },
        {
          title: "Laboratory Packages",
          url: "/laboratory-packages",
          icon: FlaskRound,
        },
        {
          title: "Hospital Packages",
          url: "/hospital-packages",
          icon: IconHospital,
        },
      ],
    },
    {
      title: "Claim Management",
      url: "/claims",
      icon: FileText,
      isActive: true,
      items: [
        {
          title: "View Claims",
          url: "/claims",
          icon: Eye,
        },
      ],
    },
    {
      title: "Contribution Management",
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
      title: "Statement Management",
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
