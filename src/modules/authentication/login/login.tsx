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
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { OtpForm } from "./otp";
import { useSession } from "@/hooks/auth";
import { logger } from "@/lib/logger";

interface LoginFormProps extends React.ComponentProps<"div"> {
  onLoginSuccess?: () => void;
}

export function LoginForm({
  className,
  onLoginSuccess,
  ...props
}: LoginFormProps) {
  const [email, setEmail] = useState("medsave.africa@gmail.com");
  const [password, setPassword] = useState("Amoako@21");
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState("");
  const [otpData, setOtpData] = useState<{
    email: string;
    request_id: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { requestOtp } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    logger.debug("handleSubmit called");
    e.preventDefault();
    setError("");

    if (!showOtp) {
      // First step: request OTP
      if (email && password) {
        setIsLoading(true);
        try {
          const otpResponse = await requestOtp(email, password);

          setOtpData({
            email: otpResponse.email,
            request_id: otpResponse.requestId,
          });
          setShowOtp(true);
        } catch (error) {
          setError(error as string);
        } finally {
          setIsLoading(false);
        }
      } else {
        setError("Please enter both email and password");
      }
    }
  };

  const handleOtpSuccess = () => {
    onLoginSuccess?.();
  };

  const handleBack = () => {
    setShowOtp(false);
    setError("");
    setOtpData(null);
  };

  if (showOtp && otpData) {
    return (
      <OtpForm
        email={otpData.email}
        request_id={otpData.request_id}
        onOtpSuccess={handleOtpSuccess}
        onBack={handleBack}
        className={className}
        {...props}
      />
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Field>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending OTP..." : "Send OTP"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
