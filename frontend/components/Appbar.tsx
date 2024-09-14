

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LinkButton } from "./buttons/LinkButton";
import { PrimaryButton } from "./buttons/PrimaryButton";

export const Appbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="border-b">
      <div className="flex justify-between items-center p-4">
        <div className="text-2xl font-extrabold">Zapier</div>
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 border rounded-md focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <div className="hidden sm:flex flex-row items-center">
          <div className="sm:pr-4">
            <LinkButton onClick={() => {}}>Contact Sales</LinkButton>
          </div>
          <div className="sm:pr-4">
            <LinkButton onClick={() => router.push("/login")}>Login</LinkButton>
          </div>
          <div className="sm:pr-4">
            <PrimaryButton onClick={() => router.push("/signup")}>
              Signup
            </PrimaryButton>
          </div>
        </div>
      </div>

      <div className={`sm:hidden ${isMenuOpen ? "block" : "hidden"} p-4`}>
        <div className="flex flex-col items-end space-y-2">
          <LinkButton onClick={() => {}}>Contact Sales</LinkButton>
          <LinkButton onClick={() => router.push("/login")}>Login</LinkButton>
          <PrimaryButton onClick={() => router.push("/signup")}>
            Signup
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

