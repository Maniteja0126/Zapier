"use client";

import React from "react";
import { PrimaryButton } from "./buttons/PrimaryButton";
import { SecondaryButton } from "./buttons/SecondaryButton";
import Feature from "./Feature";
import { useRouter } from "next/navigation";

export const Hero = () => {
  const router = useRouter();
  return (
    <div className="px-4 py-8">
      <div className="flex justify-center">
        <div className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center pt-4 max-w-xl mx-auto">
          Automate as fast as you can type
        </div>
      </div>
      <div className="flex justify-center pt-4">
        <div className="text-base sm:text-lg md:text-xl font-normal text-center max-w-2xl mx-auto">
          AI gives you automation superpowers, and Zapier puts them to work.
          Pairing AI and Zapier helps you turn ideas into workflows and bots
          that work for you.
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-center pt-6 sm:space-x-4 items-center">
        <PrimaryButton onClick={() => {router.push("/signup")}} size="big">
          Get Started free
        </PrimaryButton>
        <div className="pt-4 sm:pt-0">
          <SecondaryButton size="big" onClick={() => {}}>
            Contact Sales
          </SecondaryButton>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center pt-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <Feature title={"Free Forever"} subTitle={"for core features"} />
        <Feature title={"More apps"} subTitle={"than any other platform"} />
        <Feature title={"Cutting Edge"} subTitle={"AI Features"} />
      </div>
    </div>
  );
};
