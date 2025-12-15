import { Wallet } from "@/types";
import FormFieldWrapper from "@/components/common/form/form-field-wrapper";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type WalletDetailsProps = {
  wallet: Wallet | undefined;
  isLoading: boolean;
};

export default function WalletDetails({
  wallet,
  isLoading,
}: WalletDetailsProps) {
  const balance = wallet ? parseFloat(wallet.balance) : 0;
  const dailyLimit = wallet ? parseFloat(wallet.dailyLimit) : 0;
  const monthlyLimit = wallet ? parseFloat(wallet.monthlyLimit) : 0;
  const userInitials = wallet
    ? `${wallet.user.firstName[0]}${wallet.user.lastName[0]}`.toUpperCase()
    : "";

  return (
    <div className="border ">
      <header className="px-4 py-3 border-b">
        <h1 className="font-bold text-xl text-medsave-black-500">
          Wallet Details
        </h1>
      </header>
      <section className="p-4 ">
        <div className="flex flex-col space-y-6">
          <FormFieldWrapper
            label="Account Holder"
            description="The user who owns this wallet"
            isLoading={isLoading}
          >
            {wallet ? (
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 bg-gray-100">
                  <AvatarFallback className="text-sm font-medium text-gray-700">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    {wallet.user.firstName} {wallet.user.lastName}
                  </span>
                  <span className="text-sm text-gray-500">
                    {wallet.user.email}
                  </span>
                  <span className="text-sm text-gray-500">
                    {wallet.user.phoneNumber}
                  </span>
                </div>
              </div>
            ) : (
              <span className="text-sm text-gray-500">-</span>
            )}
          </FormFieldWrapper>

          <FormFieldWrapper
            label="Balance"
            description="Current wallet balance"
            isLoading={isLoading}
          >
            <Input
              className="h-15 w-full disabled:bg-medsave-black-50 disabled:border-medsave-black-100 disabled:cursor-not-allowed"
              type="text"
              value={
                wallet
                  ? `${wallet.currency} ${balance.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  : ""
              }
              disabled={true}
            />
          </FormFieldWrapper>

          <FormFieldWrapper
            label="Currency"
            description="The currency used for this wallet"
            isLoading={isLoading}
          >
            <Input
              className="h-15 w-full disabled:bg-medsave-black-50 disabled:border-medsave-black-100 disabled:cursor-not-allowed"
              type="text"
              value={wallet?.currency || ""}
              disabled={true}
            />
          </FormFieldWrapper>

          <FormFieldWrapper
            label="Daily Limit"
            description="Maximum transaction amount per day"
            isLoading={isLoading}
          >
            <Input
              className="h-15 w-full disabled:bg-medsave-black-50 disabled:border-medsave-black-100 disabled:cursor-not-allowed"
              type="text"
              value={
                wallet
                  ? `${wallet.currency} ${dailyLimit.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  : ""
              }
              disabled={true}
            />
          </FormFieldWrapper>

          <FormFieldWrapper
            label="Monthly Limit"
            description="Maximum transaction amount per month"
            isLoading={isLoading}
          >
            <Input
              className="h-15 w-full disabled:bg-medsave-black-50 disabled:border-medsave-black-100 disabled:cursor-not-allowed"
              type="text"
              value={
                wallet
                  ? `${wallet.currency} ${monthlyLimit.toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}`
                  : ""
              }
              disabled={true}
            />
          </FormFieldWrapper>

          <FormFieldWrapper
            label="Mobile Money"
            description="Mobile money linking status"
            isLoading={isLoading}
          >
            <div className="flex flex-col gap-2">
              <Input
                className="h-15 w-full disabled:bg-medsave-black-50 disabled:border-medsave-black-100 disabled:cursor-not-allowed"
                type="text"
                value={wallet?.isMomoLinked ? "Linked" : "Not Linked"}
                disabled={true}
              />
              {wallet?.isMomoLinked && wallet.mobileMoneyProvider && (
                <Input
                  className="h-15 w-full disabled:bg-medsave-black-50 disabled:border-medsave-black-100 disabled:cursor-not-allowed"
                  type="text"
                  value={`${wallet.mobileMoneyProvider} ${wallet.mobileMoneyNumber || ""}`}
                  disabled={true}
                />
              )}
            </div>
          </FormFieldWrapper>
        </div>
      </section>
    </div>
  );
}
