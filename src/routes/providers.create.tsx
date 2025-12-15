import { createFileRoute } from "@tanstack/react-router";
import { CreateProviderForm } from "@/modules/user-management/forms/create-provider-form";

export const Route = createFileRoute("/providers/create")({
  component: CreateProviderPage,
  validateSearch: () => ({}),
});

function CreateProviderPage() {
  return <CreateProviderForm />;
}

export default CreateProviderPage;
