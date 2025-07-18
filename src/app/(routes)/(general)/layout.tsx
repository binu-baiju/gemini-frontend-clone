"use client";
import React from "react";
import SideBar from "@/components/sidebar-components/sidebar";
import Header from "@/components/header-components/header";
import InputPrompt from "@/components/input-prompt-components/input-prompt";
import DevToast from "@/components/dev-components/dev-toast";
import { useAuthStore } from "@/utils/auth-store";

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  return (
    <main className="h-screen w-full flex overflow-hidden">
      {isLoggedIn && <SideBar />}
      <div className="flex flex-col flex-1 h-full min-h-0">
        <Header />
        <section className="w-full flex-1 min-h-0 overflow-hidden relative mx-auto">
          {children}
        </section>
        {isLoggedIn && <InputPrompt />}
      </div>
      <DevToast />
    </main>
  );
};

export default GeneralLayout;
