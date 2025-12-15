"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      icon?: LucideIcon;
    }[];
  }[];
}) {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const isActive = (itemUrl: string) => {
    // Exact match for root
    if (itemUrl === "/" && currentPath === "/") return true;
    // For other routes, check if current path starts with the item url
    if (itemUrl !== "/" && currentPath.startsWith(itemUrl)) return true;
    return false;
  };

  // Check if any sub-item is active for a parent item
  const hasActiveSubItem = (item: { items?: { url: string }[] }): boolean => {
    if (!item.items) return false;
    return item.items.some((subItem) => isActive(subItem.url));
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const itemIsActive = isActive(item.url) || hasActiveSubItem(item);

          // If item has no children, render as simple link like navSecondary
          if (!item.items || item.items.length === 0) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={itemIsActive}
                  className={cn(
                    "transition-all duration-200 relative",
                    itemIsActive &&
                      "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90 font-medium shadow-sm before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-6 before:bg-sidebar-primary before:rounded-r-full"
                  )}
                >
                  <Link to={item.url}>
                    {item.icon && (
                      <item.icon
                        className={cn(
                          itemIsActive && "text-sidebar-accent-foreground"
                        )}
                      />
                    )}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          // If item has children, render as collapsible dropdown
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive || itemIsActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={itemIsActive}
                    className={cn(
                      "transition-all duration-200 relative",
                      itemIsActive &&
                        "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90 font-medium shadow-sm before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-6 before:bg-sidebar-primary before:rounded-r-full"
                    )}
                  >
                    {item.icon && (
                      <item.icon
                        className={cn(
                          itemIsActive && "text-sidebar-accent-foreground"
                        )}
                      />
                    )}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => {
                      const subItemIsActive = isActive(subItem.url);
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={subItemIsActive}
                            className={cn(
                              "transition-all duration-200 relative",
                              subItemIsActive &&
                                "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90 font-medium shadow-sm before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-5 before:bg-sidebar-primary before:rounded-r-full"
                            )}
                          >
                            <Link to={subItem.url}>
                              {subItem.icon && (
                                <subItem.icon
                                  className={cn(
                                    subItemIsActive &&
                                      "text-sidebar-accent-foreground"
                                  )}
                                />
                              )}
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
