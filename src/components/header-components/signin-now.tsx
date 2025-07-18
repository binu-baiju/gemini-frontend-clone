import React from "react";
import { useAuthStore } from "@/utils/auth-store";
import { useRouter } from "next/navigation";

export default function SignInNow({
  userData,
}: {
  userData?: { phone?: string };
}) {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  if (isLoggedIn && userData && userData.phone) {
    return (
      <div className="flex items-center gap-2">
        <span className="font-medium">{userData.phone}</span>
        <button
          className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    );
  }

  // If not logged in, show Login button
  if (!isLoggedIn) {
    return (
      <button
        className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
        onClick={() => router.push("/auth")}
      >
        Login
      </button>
    );
  }

  return null;
}
