import { Provider } from "@/types";
import FormFieldWrapper from "@/components/common/form/form-field-wrapper";
import { Skeleton } from "@/components/ui/skeleton";

type ProviderPaymentInformationProps = {
  provider: Provider | undefined;
  isLoading: boolean;
};

export default function ProviderPaymentInformation({
  provider,
  isLoading,
}: ProviderPaymentInformationProps) {
  const paymentInfo = provider?.paymentInformation;
  const bank = paymentInfo?.bank;
  const momo = paymentInfo?.momo;

  return (
    <div>
      <header className="flex items-center flex-1 justify-between px-4 py-3 border border-b-0">
        <h1 className="font-bold text-xl text-medsave-black-500">
          Payment Information
        </h1>
      </header>
      <section className="p-4 border">
        <div className="flex flex-col space-y-6">
          {/* Bank Information Section */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-sm font-semibold text-medsave-black-500 mb-2">
              Bank Account
            </h2>
            <FormFieldWrapper
              label="Bank Name"
              description="The name of the bank"
              isLoading={isLoading}
            >
              {isLoading ? (
                <Skeleton className="h-15 w-full" />
              ) : (
                <p className="text-sm text-medsave-black-500">
                  {bank?.bankName || "—"}
                </p>
              )}
            </FormFieldWrapper>

            <FormFieldWrapper
              label="Account Number"
              description="The bank account number"
              isLoading={isLoading}
            >
              {isLoading ? (
                <Skeleton className="h-15 w-full" />
              ) : (
                <p className="text-sm font-mono text-medsave-black-500">
                  {bank?.accountNumber || "—"}
                </p>
              )}
            </FormFieldWrapper>

            <FormFieldWrapper
              label="Swift Code"
              description="The bank's SWIFT code"
              isLoading={isLoading}
            >
              {isLoading ? (
                <Skeleton className="h-15 w-full" />
              ) : (
                <p className="text-sm font-mono text-medsave-black-500">
                  {bank?.swiftCode || "—"}
                </p>
              )}
            </FormFieldWrapper>

            <FormFieldWrapper
              label="Account Holder"
              description="The name of the account holder"
              isLoading={isLoading}
            >
              {isLoading ? (
                <Skeleton className="h-15 w-full" />
              ) : (
                <p className="text-sm text-medsave-black-500">
                  {bank?.accountHolderName || "—"}
                </p>
              )}
            </FormFieldWrapper>

            <FormFieldWrapper
              label="Account Type"
              description="The type of bank account"
              isLoading={isLoading}
            >
              {isLoading ? (
                <Skeleton className="h-15 w-full" />
              ) : (
                <p className="text-sm text-medsave-black-400">
                  {bank?.accountType || "—"}
                </p>
              )}
            </FormFieldWrapper>
          </div>

          {/* Mobile Money Information Section */}
          <div className="flex flex-col space-y-4 pt-4 border-t">
            <h2 className="text-sm font-semibold text-medsave-black-500 mb-2">
              Mobile Money
            </h2>
            <FormFieldWrapper
              label="Provider"
              description="The mobile money provider"
              isLoading={isLoading}
            >
              {isLoading ? (
                <Skeleton className="h-15 w-full" />
              ) : (
                <p className="text-sm text-medsave-black-500">
                  {momo?.provider || "—"}
                </p>
              )}
            </FormFieldWrapper>

            <FormFieldWrapper
              label="Mobile Number"
              description="The mobile money number"
              isLoading={isLoading}
            >
              {isLoading ? (
                <Skeleton className="h-15 w-full" />
              ) : (
                <p className="text-sm font-mono text-medsave-black-500">
                  {momo?.momoNumber || "—"}
                </p>
              )}
            </FormFieldWrapper>

            <FormFieldWrapper
              label="Account Holder"
              description="The name of the account holder"
              isLoading={isLoading}
            >
              {isLoading ? (
                <Skeleton className="h-15 w-full" />
              ) : (
                <p className="text-sm text-medsave-black-500">
                  {momo?.accountHolderName || "—"}
                </p>
              )}
            </FormFieldWrapper>

            <FormFieldWrapper
              label="Account Type"
              description="The type of mobile money account"
              isLoading={isLoading}
            >
              {isLoading ? (
                <Skeleton className="h-15 w-full" />
              ) : (
                <p className="text-sm text-medsave-black-400">
                  {momo?.accountType || "—"}
                </p>
              )}
            </FormFieldWrapper>
          </div>
        </div>
      </section>
    </div>
  );
}
