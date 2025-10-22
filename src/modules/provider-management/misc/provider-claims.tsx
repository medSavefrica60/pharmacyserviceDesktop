import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DataTable } from "@/components/common/data-table/data-table";
import {
  useProviderClaimsTableColumns,
  type ProviderClaim,
} from "@/hooks/common/table/columns/use-provider-claims-table-columns";
import { useProviderClaimsToolbar } from "@/hooks/common/table/toolbars/use-provider-claims-toolbar";
import { useGetProvider } from "@/hooks/api/use-providers";

// Mock claims data
const mockProviderClaims: ProviderClaim[] = [
  {
    id: "c001",
    claimId: "CLM-2024-001",
    patientName: "Kwame Mensah",
    patientId: "PT-123456",
    service: "General Consultation",
    claimDate: "2024-10-15T10:30:00Z",
    amount: "₵250.00",
    status: "Approved",
  },
  {
    id: "c002",
    claimId: "CLM-2024-002",
    patientName: "Ama Osei",
    patientId: "PT-123457",
    service: "Blood Test",
    claimDate: "2024-10-14T14:20:00Z",
    amount: "₵150.00",
    status: "Pending",
  },
  {
    id: "c003",
    claimId: "CLM-2024-003",
    patientName: "Kofi Asante",
    patientId: "PT-123458",
    service: "X-Ray Imaging",
    claimDate: "2024-10-13T09:15:00Z",
    amount: "₵400.00",
    status: "Approved",
  },
  {
    id: "c004",
    claimId: "CLM-2024-004",
    patientName: "Akua Boateng",
    patientId: "PT-123459",
    service: "Prescription Medication",
    claimDate: "2024-10-12T16:45:00Z",
    amount: "₵320.00",
    status: "Rejected",
  },
  {
    id: "c005",
    claimId: "CLM-2024-005",
    patientName: "Yaw Owusu",
    patientId: "PT-123460",
    service: "Dental Checkup",
    claimDate: "2024-10-11T11:00:00Z",
    amount: "₵180.00",
    status: "Approved",
  },
  {
    id: "c006",
    claimId: "CLM-2024-006",
    patientName: "Abena Appiah",
    patientId: "PT-123461",
    service: "Physiotherapy Session",
    claimDate: "2024-10-10T13:30:00Z",
    amount: "₵200.00",
    status: "Pending",
  },
  {
    id: "c007",
    claimId: "CLM-2024-007",
    patientName: "Kojo Amoah",
    patientId: "PT-123462",
    service: "Eye Examination",
    claimDate: "2024-10-09T10:00:00Z",
    amount: "₵120.00",
    status: "Approved",
  },
  {
    id: "c008",
    claimId: "CLM-2024-008",
    patientName: "Efua Darko",
    patientId: "PT-123463",
    service: "Vaccination",
    claimDate: "2024-10-08T15:20:00Z",
    amount: "₵80.00",
    status: "Approved",
  },
  {
    id: "c009",
    claimId: "CLM-2024-009",
    patientName: "Samuel Mensah",
    patientId: "PT-123464",
    service: "Ultrasound Scan",
    claimDate: "2024-10-07T09:45:00Z",
    amount: "₵500.00",
    status: "Pending",
  },
  {
    id: "c010",
    claimId: "CLM-2024-010",
    patientName: "Grace Nimako",
    patientId: "PT-123465",
    service: "Surgery Consultation",
    claimDate: "2024-10-06T14:00:00Z",
    amount: "₵350.00",
    status: "Rejected",
  },
];

export const ViewProviderClaims = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/providers" }) as {
    dialog?: string;
    providerId?: string;
  };

  const isOpen = search.dialog === "claims" && !!search.providerId;
  const { data: provider } = useGetProvider(search.providerId);
  const columns = useProviderClaimsTableColumns();

  const handleClose = () => {
    navigate({
      to: "/providers",
      search: { sheet: undefined, dialog: undefined, providerId: undefined },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl max-h-[85vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle>Provider Claims</DialogTitle>
          <DialogDescription>
            {provider
              ? `View all claims for ${provider.organizationName}`
              : "View all claims for this provider"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <DataTable
            data={mockProviderClaims}
            className="border-0 flex-1"
            count={mockProviderClaims.length}
            limit={10}
            pageSizeOptions={[5, 10, 20, 50]}
            columns={columns}
            Toolbar={useProviderClaimsToolbar}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
