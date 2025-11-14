import { useQuery } from "@tanstack/react-query";
import { AuditLogsResponse, BaseSuccessResponse } from "@/types";
import { queryFn } from "@/api";
import { AppServices } from "@/lib/services/providers";

// Fetch all audit logs
export const useGetAuditLogs = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ["audit-logs", params],
    queryFn: async () => {
      const response = await queryFn<AuditLogsResponse>(
        AppServices.audit.get_all_audit_logs(params)
      );
      return response.data;
    },
  });
};

// Fetch single audit log
export const useGetAuditLog = (auditLogId: string | undefined) => {
  return useQuery({
    queryKey: ["audit-log", auditLogId],
    queryFn: async () => {
      if (!auditLogId) throw new Error("Audit Log ID is required");

      const response = await queryFn<BaseSuccessResponse<any>>(
        AppServices.audit.get_id_audit_log(auditLogId)
      );
      return response.data;
    },
    enabled: !!auditLogId,
  });
};
