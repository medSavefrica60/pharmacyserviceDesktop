import { ServiceDefinition } from "@/types";

export const AppServices = {
  users: {
    create_user: (data: Record<string, unknown>): ServiceDefinition => ({
      method: "POST",
      url: "/users",
      data,
    }),
    get_all_users: (params?: Record<string, unknown>): ServiceDefinition => ({
      method: "GET",
      url: "/users",
      params,
    }),
    get_id_user: (id: string): ServiceDefinition => ({
      method: "GET",
      url: `/users/${id}`,
    }),
    update_user: (
      id: string,
      data: Record<string, unknown>
    ): ServiceDefinition => ({
      method: "PATCH",
      url: `/users/${id}`,
      data,
    }),
    delete_user: (id: string): ServiceDefinition => ({
      method: "DELETE",
      url: `/users/${id}`,
    }),

    // extra endpoints
    get_user_providers: (userId: string): ServiceDefinition => ({
      method: "GET",
      url: `/users/${userId}/providers`,
    }),

    get_user_package_enrollments: (userId: string): ServiceDefinition => ({
      method: "GET",
      url: `/packages/user/${userId}`,
    }),
    get_user_package_wallet_balance: (userId: string): ServiceDefinition => ({
      method: "GET",
      url: `/packages/user/${userId}/wallet`,
    }),
    get_user_statements: (
      userId: string,
      params?: Record<string, unknown>
    ): ServiceDefinition => ({
      method: "GET",
      url: `/statements/user/${userId}`,
      params,
    }),
    get_user_mini_statement: (userId: string): ServiceDefinition => ({
      method: "GET",
      url: `/statements/user/${userId}/mini`,
    }),
    get_user_dependents: (
      userId: string,
      params?: Record<string, unknown>
    ): ServiceDefinition => ({
      method: "GET",
      url: `/dependents/user/${userId}`,
      params,
    }),
    get_user_claims: (
      patientId: string,
      params?: Record<string, unknown>
    ): ServiceDefinition => ({
      method: "GET",
      url: `/patients/${patientId}/claims`,
      params: { ...params },
    }),
  },
  providers: {
    create_provider: (data: Record<string, unknown>): ServiceDefinition => ({
      method: "POST",
      url: "/providers",
      data,
    }),
    get_all_providers: (
      params?: Record<string, unknown>
    ): ServiceDefinition => ({
      method: "GET",
      url: "/providers",
      params,
    }),
    get_id_provider: (id: string): ServiceDefinition => ({
      method: "GET",
      url: `/providers/${id}`,
    }),
    update_provider: (
      id: string,
      data: Record<string, unknown>
    ): ServiceDefinition => ({
      method: "PATCH",
      url: `/providers/${id}`,
      data,
    }),
    delete_provider: (id: string): ServiceDefinition => ({
      method: "DELETE",
      url: `/providers/${id}`,
    }),

    // extra endpoints
    get_provider_claims: (id: string): ServiceDefinition => ({
      method: "GET",
      url: `/providers/${id}/claims`,
    }),

    get_provider_remittance_history: (
      id: string,
      params?: Record<string, unknown>
    ): ServiceDefinition => ({
      method: "GET",
      url: `/providers/${id}/remittance`,
      params,
    }),
  },

  wallets: {
    get_all_wallets: (params?: Record<string, unknown>): ServiceDefinition => ({
      method: "GET",
      url: "/wallets",
      params,
    }),
    get_id_wallet: (id: string): ServiceDefinition => ({
      method: "GET",
      url: `/wallets/${id}`,
    }),
    update_wallet: (
      id: string,
      data: Record<string, unknown>
    ): ServiceDefinition => ({
      method: "PATCH",
      url: `/wallets/${id}`,
      data,
    }),
    adjust_wallet_balance: (
      id: string,
      data: Record<string, unknown>
    ): ServiceDefinition => ({
      method: "POST",
      url: `/wallets/${id}/adjust-balance`,
      data,
    }),
  },

  transactions: {
    get_all_transactions: (
      params?: Record<string, unknown>
    ): ServiceDefinition => ({
      method: "GET",
      url: "/transactions",
      params,
    }),
    get_id_transaction: (id: string): ServiceDefinition => ({
      method: "GET",
      url: `/transactions/${id}`,
    }),
  },

  dependents: {
    create_dependent: (data: Record<string, unknown>): ServiceDefinition => ({
      method: "POST",
      url: "/dependents",
      data,
    }),
    get_all_dependents: (
      params?: Record<string, unknown>
    ): ServiceDefinition => ({
      method: "GET",
      url: "/dependents",
      params,
    }),
    get_id_dependent: (id: string): ServiceDefinition => ({
      method: "GET",
      url: `/dependents/${id}`,
    }),

    update_dependent: (
      id: string,
      data: Record<string, unknown>
    ): ServiceDefinition => ({
      method: "PATCH",
      url: `/dependents/${id}`,
      data,
    }),
    delete_dependent: (id: string): ServiceDefinition => ({
      method: "DELETE",
      url: `/dependents/${id}`,
    }),

    // extra endpoints
  },
  claims: {
    create_claim: (data: Record<string, unknown>): ServiceDefinition => ({
      method: "POST",
      url: "/claims",
      data,
    }),
    get_all_claims: (params?: Record<string, unknown>): ServiceDefinition => ({
      method: "GET",
      url: "/claims",
      params,
    }),

    get_id_claim: (id: string): ServiceDefinition => ({
      method: "GET",
      url: `/claims/${id}`,
    }),

    update_claim: (
      id: string,
      data: Record<string, unknown>
    ): ServiceDefinition => ({
      method: "PATCH",
      url: `/claims/${id}`,
      data,
    }),
    delete_claim: (id: string): ServiceDefinition => ({
      method: "DELETE",
      url: `/claims/${id}`,
    }),
  },
  contributions: {
    create_contribution: (
      data: Record<string, unknown>
    ): ServiceDefinition => ({
      method: "POST",
      url: "/contributions",
      data,
    }),
    get_all_contributions: (
      params?: Record<string, unknown>
    ): ServiceDefinition => ({
      method: "GET",
      url: "/contributions",
      params,
    }),
    get_id_contribution: (id: string): ServiceDefinition => ({
      method: "GET",
      url: `/contributions/${id}`,
    }),
    update_contribution: (
      id: string,
      data: Record<string, unknown>
    ): ServiceDefinition => ({
      method: "PATCH",
      url: `/contributions/${id}`,
      data,
    }),
    delete_contribution: (id: string): ServiceDefinition => ({
      method: "DELETE",
      url: `/contributions/${id}`,
    }),
  },
  statements: {
    // covered in users section
  },

  packages: {
    create_package: (data: Record<string, unknown>): ServiceDefinition => ({
      method: "POST",
      url: "/packages",
      data,
    }),
    get_all_packages: (
      params?: Record<string, unknown>
    ): ServiceDefinition => ({
      method: "GET",
      url: "/packages",
      params,
    }),
    get_id_package: (id: string): ServiceDefinition => ({
      method: "GET",
      url: `/packages/${id}`,
    }),
    update_package: (
      id: string,
      data: Record<string, unknown>
    ): ServiceDefinition => ({
      method: "PATCH",
      url: `/packages/${id}`,
      data,
    }),
    delete_package: (id: string): ServiceDefinition => ({
      method: "DELETE",
      url: `/packages/${id}`,
    }),

    // the rest is covered in the users section
  },
  medications: {
    create_medication: (data: Record<string, unknown>): ServiceDefinition => ({
      method: "POST",
      url: "/medications",
      data,
    }),
    get_all_medications: (
      params?: Record<string, unknown>
    ): ServiceDefinition => ({
      method: "GET",
      url: "/medications",
      params,
    }),
    get_id_medication: (id: string): ServiceDefinition => ({
      method: "GET",
      url: `/medications/${id}`,
    }),
    update_medication: (
      id: string,
      data: Record<string, unknown>
    ): ServiceDefinition => ({
      method: "PATCH",
      url: `/medications/${id}`,
      data,
    }),
    delete_medication: (id: string): ServiceDefinition => ({
      method: "DELETE",
      url: `/medications/${id}`,
    }),
  },

  settings: {
    change_password: (data: Record<string, unknown>): ServiceDefinition => ({
      method: "PATCH",
      url: "/auth/password",
      data,
    }),
  },
  audit: {
    get_all_audit_logs: (
      params?: Record<string, unknown>
    ): ServiceDefinition => ({
      method: "GET",
      url: "/audit-logs",
      params,
    }),
    get_id_audit_log: (id: string): ServiceDefinition => ({
      method: "GET",
      url: `/audit-logs/${id}`,
    }),
  },
  admins: {
    get_all_admins: (params?: Record<string, unknown>): ServiceDefinition => ({
      method: "GET",
      url: "/admins",
      params,
    }),
    get_id_admin: (id: string): ServiceDefinition => ({
      method: "GET",
      url: `/admins/${id}`,
    }),
    update_admin: (
      id: string,
      data: Record<string, unknown>
    ): ServiceDefinition => ({
      method: "PATCH",
      url: `/admins/${id}`,
      data,
    }),
    delete_admin: (id: string): ServiceDefinition => ({
      method: "DELETE",
      url: `/admins/${id}`,
    }),
  },
};
