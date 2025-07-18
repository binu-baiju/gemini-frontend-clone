"use client";
import { useState } from "react";
import PhoneForm from "@/components/auth/PhoneForm";
import OtpForm from "@/components/auth/OtpForm";
import { useAuthStore } from "@/utils/auth-store";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneData, setPhoneData] = useState<{
    countryCode: string;
    phone: string;
  } | null>(null);
  const login = useAuthStore((s) => s.login);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const router = useRouter();

  if (isLoggedIn) {
    router.replace("/app");
    return null;
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white dark:bg-gray-900 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In with OTP</h2>
      {step === "phone" && (
        <PhoneForm
          onSuccess={(data) => {
            setPhoneData(data);
            setStep("otp");
          }}
        />
      )}
      {step === "otp" && phoneData && (
        <OtpForm
          onSuccess={() => {
            login(phoneData.countryCode + phoneData.phone);
            router.replace("/app");
          }}
        />
      )}
    </div>
  );
}
