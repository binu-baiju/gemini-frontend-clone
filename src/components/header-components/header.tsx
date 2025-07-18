"use client";
import React from "react";
import SignInNow from "@/components/header-components/signin-now";
import TopLoader from "./top-loader";
import GeminiLogo from "./gemini-logo";
import { IoMdAdd } from "react-icons/io";
import DevButton from "../dev-components/dev-button";

const Header = () => {
  // TODO: Replace undefined with client-side user state
  const userData = undefined;
  return (
    <header className="w-full h-fit flex-shrink-0 flex items-center p-3 md:px-10 px-5 md:justify-between relative justify-end">
      <div className="md:block hidden">
        <GeminiLogo />
      </div>
      <SignInNow userData={userData} />
      <TopLoader />
    </header>
  );
};

export default Header;
