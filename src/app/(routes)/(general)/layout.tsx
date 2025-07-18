import React from "react";
import SideBar from "@/components/sidebar-components/sidebar";
import Header from "@/components/header-components/header";
import InputPrompt from "@/components/input-prompt-components/input-prompt";
import DevToast from "@/components/dev-components/dev-toast";

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-dvh w-full flex overflow-hidden">
      <SideBar />
      <div className="flex flex-grow h-full overflow-hidden flex-col justify-between relative">
        <Header />
        <section className="w-full flex-grow overflow-y-auto relative mx-auto">
          {children}
        </section>
        <InputPrompt />
      </div>
      <DevToast />
    </main>
  );
};

export default GeneralLayout;
