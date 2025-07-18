"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/utils/auth-store";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/auth");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  return <>{children}</>;
}
