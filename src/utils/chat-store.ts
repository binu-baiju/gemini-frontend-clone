import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";

export type Chatroom = {
  id: string;
  title: string;
  createdAt: number;
};

export type ChatMessage = {
  id: string;
  chatID: string;
  sender: "user" | "ai";
  text: string;
  timestamp: number;
};

type ChatState = {
  chatrooms: Chatroom[];
  messages: ChatMessage[];
  addChatroom: (title: string, id: string) => void;
  deleteChatroom: (id: string) => void;
  addMessage: (msg: ChatMessage) => void;
  setMessages: (msgs: ChatMessage[]) => void;
};

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      chatrooms: [],
      messages: [],
      addChatroom: (title: string, id: string) => {
        const newChat = {
          id, // pass the id in
          title,
          createdAt: Date.now(),
        };
        set({ chatrooms: [newChat, ...get().chatrooms] });
      },
      deleteChatroom: (id) => {
        set({
          chatrooms: get().chatrooms.filter((c) => c.id !== id),
          messages: get().messages.filter((m) => m.chatID !== id),
        });
      },
      addMessage: (msg) => set({ messages: [...get().messages, msg] }),
      setMessages: (msgs) => set({ messages: msgs }),
    }),
    { name: "chat-storage" }
  )
);
