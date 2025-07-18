"use client";
import OptimisticChat from "@/components/chat-provider-components/optimistic-chat";

const Page = () => {
  return (
    <div className="w-full max-w-3xl mx-auto p-4 pb-40">
      <OptimisticChat />
    </div>
  );
};

export default Page;
