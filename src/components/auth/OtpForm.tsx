"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function OtpForm({ onSuccess }: { onSuccess: () => void }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (otp === "123456") {
        toast.success("Login successful!");
        onSuccess();
      } else {
        toast.error("Invalid OTP");
      }
    }, 1000);
  };

  return (
    <form
      onSubmit={handleVerify}
      className="space-y-4 flex flex-col items-center"
    >
      <div className="w-full flex flex-col items-center">
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
          <InputOTPGroup>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
      <Button
        type="submit"
        disabled={loading || otp.length !== 6}
        className="w-full"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </Button>
      <div>Otp is 123456</div>
    </form>
  );
}
