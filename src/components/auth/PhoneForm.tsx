"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CountrySelect from "./CountrySelector";
import { toast } from "sonner";

const schema = z.object({
  countryCode: z.string().min(1, "Select a country code"),
  phone: z
    .string()
    .length(9, "Phone number must be exactly 9 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
});

export default function PhoneForm({
  onSuccess,
}: {
  onSuccess: (data: { countryCode: string; phone: string }) => void;
}) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { countryCode: "", phone: "" },
    mode: "onChange", // Show errors as you type
  });

  const onSubmit = (data: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast("OTP sent!");
      onSuccess(data);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <CountrySelect
        value={watch("countryCode")}
        onChange={(v) => setValue("countryCode", v)}
      />
      {errors.countryCode && (
        <div className="text-red-500 text-sm">
          {errors.countryCode.message as string}
        </div>
      )}
      <input
        {...register("phone")}
        placeholder="Phone number"
        className="w-full px-3 py-2 rounded-lg border border-blue-500 bg-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        type="tel"
      />
      {errors.phone && (
        <div className="text-red-500 text-sm">
          {errors.phone.message as string}
        </div>
      )}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Sending..." : "Send OTP"}
      </Button>
    </form>
  );
}
