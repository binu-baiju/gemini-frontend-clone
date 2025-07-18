"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  getUserChatStore,
  getCurrentUserPhone,
  ChatMessage,
  ChatState,
} from "@/utils/chat-store";
import { useParams } from "next/navigation";
import { SiGooglegemini } from "react-icons/si";
import { MdContentCopy } from "react-icons/md";
import { toast } from "sonner";
import type { UseBoundStore, StoreApi } from "zustand";

const CopyButton = ({ text }: { text: string }) => (
  <button
    className="p-1 rounded-full  hover:bg-white shadow"
    onClick={() => {
      navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    }}
    title="Copy message"
  >
    <MdContentCopy className="text-lg text-gray-500" />
  </button>
);

const OptimisticChat = () => {
  const { chat } = useParams();
  const chatID = chat as string;
  const phone = getCurrentUserPhone();
  const userChatStore = phone
    ? (getUserChatStore(phone) as UseBoundStore<StoreApi<ChatState>>)
    : null;
  const messages: ChatMessage[] = userChatStore
    ? userChatStore((s) => s.messages).filter(
        (m: ChatMessage) => m.chatID === chatID
      )
    : [];
  // Find if the last message is a user message without a following AI message
  const [isTyping, setIsTyping] = useState(false);
  const PAGE_SIZE = 10;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const containerRef = useRef<HTMLDivElement>(null);
  // Show only the latest visibleCount messages
  const pagedMessages = messages.slice(-visibleCount);

  // Handle scroll to top to load more
  const handleScroll = () => {
    const container = containerRef.current;
    if (
      container &&
      container.scrollTop === 0 &&
      visibleCount < messages.length
    ) {
      setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, messages.length));
      // Optionally, maintain scroll position
      setTimeout(() => {
        if (container) container.scrollTop = 1;
      }, 0);
    }
  };

  useEffect(() => {
    // If the last message is from user and not followed by AI, show typing
    if (messages.length > 0) {
      const last = messages[messages.length - 1];
      if (last.sender === "user") {
        setIsTyping(true);
        // Hide typing after 1.5s (should match your setTimeout in input)
        const timeout = setTimeout(() => setIsTyping(false), 1500);
        return () => clearTimeout(timeout);
      }
    }
    setIsTyping(false);
  }, [messages.length]);

  useEffect(() => {
    // Reset visibleCount when chatID changes
    setVisibleCount(PAGE_SIZE);
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chatID, messages.length]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-4 px-2 overflow-y-auto"
      style={{ height: "500px" }}
      onScroll={handleScroll}
    >
      {pagedMessages.map((msg: ChatMessage, idx: number) => (
        <div
          key={msg.id}
          className={`flex ${
            msg.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div className="flex flex-col gap-2 justify-end">
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl shadow text-base whitespace-pre-line
              ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-black rounded-bl-none flex items-center gap-2"
              }`}
            >
              {msg.sender === "user" && msg.image && (
                <img
                  src={msg.image}
                  alt="uploaded"
                  className="mb-2 rounded-lg max-w-[180px] max-h-[180px] object-contain"
                />
              )}
              {msg.sender === "ai" && (
                <SiGooglegemini className="text-2xl text-[#4E82EE] mr-2" />
              )}
              {msg.text}
            </div>

            {msg.sender === "ai" && (
              <div className="w-fit ml-auto flex justify-end">
                <CopyButton text={msg.text} />
              </div>
            )}
          </div>
        </div>
      ))}
      {isTyping && (
        <div className="flex justify-start">
          <div className="max-w-xs px-4 py-2 rounded-2xl shadow bg-gray-200 text-black rounded-bl-none flex items-center gap-2 animate-pulse">
            <SiGooglegemini className="text-2xl text-[#4E82EE] mr-2" />
            Gemini is typing...
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimisticChat;
