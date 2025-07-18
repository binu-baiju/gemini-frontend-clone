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
  image?: string; // data URL if present
};

export type ChatState = {
  chatrooms: Chatroom[];
  messages: ChatMessage[];
  addChatroom: (title: string, id: string) => void;
  deleteChatroom: (id: string) => void;
  addMessage: (msg: ChatMessage) => void;
  setMessages: (msgs: ChatMessage[]) => void;
};

const storeCache: Record<string, ReturnType<typeof create>> = {};

export function getUserChatStore(phone: string) {
  if (!storeCache[phone]) {
    storeCache[phone] = create<ChatState>()(
      persist(
        (set, get) => ({
          chatrooms: [],
          messages: [],
          addChatroom: (title: string, id: string) => {
            const newChat = {
              id,
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
        { name: `chat-storage-${phone}` }
      )
    );
  }
  return storeCache[phone];
}

// Helper to get the current user's phone from localStorage
export function getCurrentUserPhone() {
  try {
    const raw = localStorage.getItem("auth-storage");
    if (!raw) return null;
    const data = JSON.parse(raw);
    return data.state?.phone || null;
  } catch {
    return null;
  }
}

export function seedDummyChatData(phone: string) {
  const store = getUserChatStore(phone);
  const state = store.getState() as ChatState;
  const chatrooms = state.chatrooms;
  if (chatrooms.length > 0) return; // Already seeded
  const chatID = nanoid();
  state.addChatroom("Welcome to Gemini!", chatID);
  for (let i = 1; i <= 30; i++) {
    state.addMessage({
      id: nanoid(),
      chatID,
      sender: "user",
      text: `Dummy prompt #${i}`,
      timestamp: Date.now() + i * 1000,
    });
    state.addMessage({
      id: nanoid(),
      chatID,
      sender: "ai",
      text: `Gemini's response to prompt #${i}`,
      timestamp: Date.now() + i * 1000 + 500,
    });
  }
}
