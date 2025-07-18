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
  phone: z.string().min(8, "Enter a valid phone number"),
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
        className="input input-bordered w-full"
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
