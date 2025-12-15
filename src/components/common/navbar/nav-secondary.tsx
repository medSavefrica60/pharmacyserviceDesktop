import * as React from "react";
import { Link, useRouterState } from "@tanstack/react-router";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { RouteItem } from "./routes.config";

export function NavSecondary({
  items,
  ...props
}: {
  items: RouteItem[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const isActive = (itemUrl: string) => {
    // Exact match for root
    if (itemUrl === "/" && currentPath === "/") return true;
    // For other routes, check if current path starts with the item url
    if (itemUrl !== "/" && currentPath.startsWith(itemUrl)) return true;
    return false;
  };

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const active = isActive(item.url);
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={active}
                  className={cn(
                    "transition-all duration-200 relative",
                    active &&
                      "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90 font-medium shadow-sm before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-6 before:bg-sidebar-primary before:rounded-r-full"
                  )}
                >
                  <Link to={item.url}>
                    <item.icon
                      className={cn(active && "text-sidebar-accent-foreground")}
                    />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
