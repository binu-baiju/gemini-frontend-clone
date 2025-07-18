"use client";

import { useAuthStore } from "@/utils/auth-store";
import { useRouter } from "next/navigation";
import router from "next/router";
import React, { useEffect } from "react";
import { getCurrentUserPhone, seedDummyChatData } from "@/utils/chat-store";

const Page = () => {
  // const session = await auth();

  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      const phone = getCurrentUserPhone();
      if (phone) seedDummyChatData(phone);
    }
  }, [isLoggedIn]);

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     router.replace("/auth");
  //   }
  // }, [isLoggedIn, router]);

  // if (!isLoggedIn) return null;

  return (
    <section className="mt-5 fade-in-section w-full max-w-4xl mx-auto md:p-10 p-5">
      <h2 className="text-animation inline-block bg-gradient-to-r from-[#4E82EE] to-[#D96570] bg-clip-text md:text-5xl text-4xl text-transparent font-medium">
        Hello, {isLoggedIn ? "LoggedInUser" : "Guest"}
      </h2>
      <h3 className="md:text-5xl text-4xl text-wrap text-accentGray/50">
        {isLoggedIn ? "How can I help you today?" : "Sign in to get started"}
      </h3>
    </section>
  );
};

export default Page;
