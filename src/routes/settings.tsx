import AccountSecurity from "@/modules/settings/account-security";
import PersonalInformation from "@/modules/settings/personal-information";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <>
      <main className="min-h-full flex flex-col relative">
        <div className="flex h-full flex-1 flex-col pb-24">
          <div className="mb-6">
            <PersonalInformation />
          </div>
          <div className="mb-6">
            <AccountSecurity />
          </div>
        </div>
      </main>
    </>
  );
}
