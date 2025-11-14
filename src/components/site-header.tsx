import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { PlusIcon } from "lucide-react";
import { useSiteHeader, isPageAction } from "@/hooks/common/use-site-header";

export function SiteHeader() {
  const pageInfo = useSiteHeader();

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
          {pageInfo?.action &&
            (() => {
              const action = pageInfo.action;
              if (isPageAction(action)) {
                return (
                  <Button
                    onClick={() => action.onClick()}
                    className="flex items-center rounded-sm bg-medsave-blue-500"
                    size={`default`}
                    variant={`default`}
                  >
                    <PlusIcon className="mr-2 h-4 w-4" />
                    {action.label}
                  </Button>
                );
              }
              return action;
            })()}
        </div>
      </div>
    </header>
  );
}
