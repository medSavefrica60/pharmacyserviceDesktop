import type React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSession } from "@/hooks/auth";
import { logger } from "@/lib/logger";

interface OtpFormProps extends React.ComponentProps<"div"> {
  email: string;
  request_id: string;
  onOtpSuccess?: () => void;
  onBack?: () => void;
}

export function OtpForm({
  className,
  email,
  request_id,
  onOtpSuccess,
  onBack,
  ...props
}: OtpFormProps) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { verifyOtp } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    logger.info("request_id", request_id);

    e.preventDefault();
    setError("");

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP code");
      return;
    }

    setIsLoading(true);
    try {
      await verifyOtp(email, otp, request_id);
      onOtpSuccess?.();
    } catch (error) {
      setError(
        error as string
        // error instanceof Error
        //   ? error.message
        //   : "Invalid OTP code. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Verify Your Email</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to {email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldDescription>
                  A 6-digit code has been sent to {email}
                </FieldDescription>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  required
                  className="text-center text-lg tracking-widest"
                />
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </Field>
              <Field>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={onBack}
                >
                  Back
                </Button>
                <FieldDescription className="text-center">
                  Didn't receive the code? <a href="#">Resend</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
