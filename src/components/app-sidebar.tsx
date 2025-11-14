import * as React from "react";
import { IconInnerShadowTop } from "@tabler/icons-react";

import { NavMain, NavSecondary, NavUser } from "@/components/common/navbar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { routesConfig } from "./common/navbar/routes.config";
import { useSession } from "@/hooks/auth";

const data = {
  navMain: routesConfig.navMain,
  navSecondary: routesConfig.navSecondary,
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { session } = useSession();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">MedSave Africa</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            fullName: session?.user.fullName ?? "Onyinye Ogbuefi",
            email: session?.user.email ?? "onyinye.ogbuefi@medsave.com",
            avatar: null,
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
