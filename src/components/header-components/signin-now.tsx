import React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/utils/auth-store";

export default function SignInNow({
  userData,
}: {
  userData?: { phone?: string };
}) {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  if (userData && userData.phone) {
    return (
      <div className="flex items-center gap-2">
        <span className="font-medium">{userData.phone}</span>
        <button
          className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
          onClick={logout}
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
      onClick={() => router.push("/auth")}
    >
      Sign In
    </button>
  );
}
