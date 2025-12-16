import { Provider } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Scroller } from "@/components/ui/scroller";
import { MedEmptyBoxIcon } from "@/components/common/icons";

type ProviderSubscribedPackagesProps = {
  provider: Provider | undefined;
  isLoading: boolean;
};

export default function ProviderSubscribedPackages({
  provider,
  isLoading,
}: ProviderSubscribedPackagesProps) {
  const packages = provider?.subscribedPackages || [];
  const packageCount = packages.length;

  return (
    <div>
      <header className="flex items-center flex-1 justify-between px-4 py-3 border border-b-0">
        <h1 className="font-bold text-xl text-medsave-black-500">
          Subscribed Packages {!isLoading && `(${packageCount})`}
        </h1>
      </header>
      <section className="p-4 border">
        <Scroller className="h-[calc(100vh-600px)]">
          <div className="flex flex-col gap-2.5 pr-4">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={`skeleton-${idx}`}
                  className="rounded-md border bg-accent"
                >
                  <div className="p-4">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                </div>
              ))
            ) : packages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <MedEmptyBoxIcon />
                <p className="text-sm text-muted-foreground mt-4">
                  No subscribed packages
                </p>
              </div>
            ) : (
              packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="rounded-md border bg-accent hover:bg-medsave-black-50 transition-colors"
                >
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-medsave-black-500">
                        {pkg.name}
                      </h3>
                      <Badge
                        variant={
                          pkg.status === "ACTIVE" ? "default" : "secondary"
                        }
                        className={cn(
                          "text-xs px-2 py-0",
                          pkg.status === "ACTIVE"
                            ? "bg-medsave-success-50 text-medsave-success-500 border-medsave-success-100"
                            : "bg-gray-50 text-gray-500 border-gray-200"
                        )}
                      >
                        {pkg.status}
                      </Badge>
                    </div>
                    {pkg.description && (
                      <p className="text-sm text-medsave-black-400 mb-2">
                        {pkg.description}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Minimum Amount: ₵{pkg.minAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Scroller>
      </section>
    </div>
  );
}
