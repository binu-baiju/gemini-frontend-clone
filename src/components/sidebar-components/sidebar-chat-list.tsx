"use client";
import React, { useState } from "react";
import DevButton from "../dev-components/dev-button";
import clsx from "clsx";
import Link from "next/link";
import { MdOutlineChatBubbleOutline, MdDeleteOutline } from "react-icons/md";
import { useParams } from "next/navigation";
import { getUserChatStore, getCurrentUserPhone } from "@/utils/chat-store";
import { toast } from "sonner";
import { Chatroom } from "@/utils/chat-store";

type SidebarChatListProps = {
  chatrooms: Chatroom[];
};

const SidebarChatList = ({ chatrooms }: SidebarChatListProps) => {
  const { chat } = useParams();
  const [hovered, setHovered] = useState<string | null>(null);
  const phone = getCurrentUserPhone();
  const userChatStore = phone ? getUserChatStore(phone) : null;
  const deleteChatroom = userChatStore
    ? userChatStore((s) => s.deleteChatroom)
    : () => {};

  const handleDelete = (id: string) => {
    deleteChatroom(id);
    toast.success("Chat deleted successfully");
  };

  return (
    <ul className="mt-2 space-y-1 ">
      {chatrooms.map((room) => (
        <li key={room.id} className="relative group">
          <DevButton
            rounded="full"
            variant="v3"
            href={`/app/${room.id}`}
            className={clsx(
              "text-sm overflow-hidden group !w-full justify-between relative !pr-2 gap-4",
              room.id === chat && "!bg-accentBlue/50"
            )}
            onMouseEnter={() => setHovered(room.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="grid grid-cols-[auto_1fr] items-center w-full gap-4">
              <MdOutlineChatBubbleOutline className="text-lg" />
              <p className="truncate text-left">{room.title}</p>
            </div>
            {hovered === room.id && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(room.id);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 z-10"
                title="Delete chat"
              >
                <MdDeleteOutline className="text-lg" />
              </button>
            )}
          </DevButton>
        </li>
      ))}
    </ul>
  );
};

export default SidebarChatList;
