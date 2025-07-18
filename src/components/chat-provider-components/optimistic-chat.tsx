"use client";
import React, { useState, useEffect } from "react";
import { useChatStore } from "@/utils/chat-store";
import { useParams } from "next/navigation";
import { SiGooglegemini } from "react-icons/si";

const OptimisticChat = () => {
  const { chat } = useParams();
  const chatID = chat as string;
  const messages = useChatStore((s) => s.messages).filter(
    (m) => m.chatID === chatID
  );
  // Find if the last message is a user message without a following AI message
  const [isTyping, setIsTyping] = useState(false);

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

  return (
    <div className="flex flex-col gap-4 px-2">
      {messages.map((msg, idx) => (
        <div
          key={msg.id}
          className={`flex ${
            msg.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-xs px-4 py-2 rounded-2xl shadow text-base whitespace-pre-line
              ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-black rounded-bl-none flex items-center gap-2"
              }`}
          >
            {msg.sender === "ai" && (
              <SiGooglegemini className="text-2xl text-[#4E82EE] mr-2" />
            )}
            {msg.text}
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
