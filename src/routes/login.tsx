import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginForm } from "@/modules/authentication/login/login";
import { GalleryVerticalEnd } from "lucide-react";

export const Route = createFileRoute("/login")({
  beforeLoad: async ({ context }) => {
    const { isAuthenticated } = context;
    if (isAuthenticated) {
      throw redirect({ to: "/" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          MedSave Africa
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
