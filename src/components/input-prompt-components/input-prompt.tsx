"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { useMeasure } from "react-use";
import InputActions from "./input-actions";
import Link from "next/link";
import { MdImageSearch } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useAuthStore } from "@/utils/auth-store";
import {
  getUserChatStore,
  getCurrentUserPhone,
  ChatState,
  Chatroom,
} from "@/utils/chat-store";
import type { UseBoundStore, StoreApi } from "zustand";

const InputPrompt = () => {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const userPhone = useAuthStore((s) => s.phone);
  const router = useRouter();
  const { chat } = useParams();
  const phone = getCurrentUserPhone();
  const userChatStore = phone
    ? (getUserChatStore(phone) as UseBoundStore<StoreApi<ChatState>>)
    : null;
  const addMessage = userChatStore
    ? userChatStore((s) => s.addMessage)
    : () => {};
  const addChatroom = userChatStore
    ? userChatStore((s) => s.addChatroom)
    : () => {};
  const chatrooms: Chatroom[] = userChatStore
    ? userChatStore((s) => s.chatrooms)
    : [];
  const [inputImg, setInputImg] = useState<File | null>(null);
  const [inputImgName, setInputImgName] = useState<string | null>(null);
  const [userPrompt, setUserPrompt] = useState("");
  const [msgLoader, setMsgLoader] = useState(false);
  const [optimisticResponse, setOptimisticResponse] = useState<string | null>(
    null
  );
  const [optimisticPrompt, setOptimisticPrompt] = useState<string | null>(null);
  const [inputRref, { height }] = useMeasure<HTMLTextAreaElement>();
  const cancelRef = useRef(false);

  const handleSend = useCallback(() => {
    if (!isLoggedIn || !phone || !userChatStore) {
      router.push("/auth");
      return;
    }
    if (!userPrompt.trim()) return;

    const send = (imgDataUrl?: string) => {
      // If on /app (no chat param), create a new chatroom, add the message, and redirect
      if (!chat) {
        const newChatID = nanoid();
        const title = userPrompt.split(" ").slice(0, 5).join(" ");
        addChatroom(title, newChatID);
        addMessage({
          id: nanoid(),
          chatID: newChatID,
          sender: "user",
          text: userPrompt,
          timestamp: Date.now(),
          image: imgDataUrl,
        });
        setUserPrompt("");
        setInputImg(null);
        setInputImgName(null);
        setMsgLoader(true);
        setOptimisticPrompt(userPrompt);
        setTimeout(() => {
          if (cancelRef.current) return;
          addMessage({
            id: nanoid(),
            chatID: newChatID,
            sender: "ai",
            text: "This is a simulated Gemini reply!",
            timestamp: Date.now(),
            image: imgDataUrl, // For demo, echo image back
          });
          setOptimisticResponse(null);
          setMsgLoader(false);
        }, 1500);
        router.push(`/app/${newChatID}`);
        return;
      }

      // If already in a chatroom, just add the message to the current chatroom
      const currentChatID = chat as string;
      addMessage({
        id: nanoid(),
        chatID: currentChatID,
        sender: "user",
        text: userPrompt,
        timestamp: Date.now(),
        image: imgDataUrl,
      });
      setUserPrompt("");
      setInputImg(null);
      setInputImgName(null);
      setMsgLoader(true);
      setOptimisticPrompt(userPrompt);
      setTimeout(() => {
        if (cancelRef.current) return;
        addMessage({
          id: nanoid(),
          chatID: currentChatID,
          sender: "ai",
          text: "This is a simulated Gemini reply!",
          timestamp: Date.now(),
          image: imgDataUrl, // For demo, echo image back
        });
        setOptimisticResponse(null);
        setMsgLoader(false);
      }, 1500);
    };

    if (inputImg) {
      const reader = new FileReader();
      reader.onload = (e) => {
        send(e.target?.result as string);
      };
      reader.readAsDataURL(inputImg);
    } else {
      send();
    }
  }, [
    isLoggedIn,
    userPrompt,
    chat,
    addMessage,
    addChatroom,
    router,
    phone,
    inputImg,
    userPrompt,
    cancelRef,
    userChatStore,
  ]);

  const handleTextareaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setUserPrompt(e.target.value);
    },
    []
  );

  const handleCancel = useCallback(() => {
    cancelRef.current = true;
    setOptimisticResponse("User has aborted the request");
    setMsgLoader(false);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      const file = event.target.files[0];
      setInputImg(file);
      setInputImgName(file.name);
    }
  };

  return (
    <div className=" flex-shrink-0 w-full md:px-10 px-5 pb-2 space-y-2 bg-white dark:bg-[#131314]">
      {inputImgName && (
        <div className="max-w-4xl overflow-hidden w-full mx-auto">
          <div className="p-5 w-fit relative max-w-full overflow-hidden bg-rtlLight group dark:bg-rtlDark rounded-t-3xl flex items-start gap-2">
            <MdImageSearch className="text-4xl" />
            <p className="text-lg font-semibold truncate"> {inputImgName}</p>
            <IoMdClose
              onClick={() => {
                setInputImgName(null);
                setInputImg(null);
              }}
              className="absolute top-1 right-1 text-2xl rounded-full cursor-pointer hover:opacity-100 hidden group-hover:block opacity-80 bg-accentGray/40 p-1"
            />
          </div>
        </div>
      )}
      <div
        className={`w-full md:border-8 border-4 relative border-rtlLight dark:border-rtlDark max-w-4xl mx-auto min-h-16 md:rounded-[50px] rounded-2xl ${
          inputImgName && " !rounded-tl-none "
        } overflow-hidden bg-rtlLight dark:bg-rtlDark flex gap-1 md:items-center md:justify-between md:flex-row flex-col `}
      >
        <textarea
          name="prompt"
          ref={inputRref}
          disabled={msgLoader}
          placeholder={"Enter a prompt here"}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          value={optimisticResponse || msgLoader ? "" : userPrompt}
          className={`flex-1 bg-transparent rounded-4xl p-2 pl-6 outline-none text-lg max-h-56 resize-none`}
        />
        <InputActions
          handleCancel={handleCancel}
          handleImageUpload={handleImageUpload}
          generateMsg={handleSend}
          userPrompt={userPrompt}
          msgLoader={msgLoader}
        />
      </div>
      <p className="text-xs font-light opacity-80 text-center">
        Gemini may display inaccurate info, including about people, so
        double-check its responses.{" "}
        <Link className="underline" href="/">
          Your privacy & Gemini Apps
        </Link>
      </p>
    </div>
  );
};

export default InputPrompt;
