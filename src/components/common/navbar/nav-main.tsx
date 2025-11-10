"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
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
                      itemIsActive &&
                        "bg-blue-500 text-white font-medium hover:bg-blue-600"
                    )}
                  >
                    {item.icon && (
                      <item.icon className={cn(itemIsActive && "text-white")} />
                    )}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      const subItemIsActive = isActive(subItem.url);
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={subItemIsActive}
                            className={cn(
                              subItemIsActive &&
                                "bg-blue-500 text-white font-medium hover:bg-blue-600"
                            )}
                          >
                            <Link to={subItem.url}>
                              {subItem.icon && (
                                <subItem.icon
                                  className={cn(
                                    subItemIsActive && "text-white"
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
