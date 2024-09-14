"use client";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { CheckFeature } from "@/components/CheckFeature";
import { Input } from "@/components/Input";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async () => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        {
          username : email,
          password : password,
          name : name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      router.push("/login");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="flex justify-center px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row pt-8 max-w-4xl w-full">
        <div className="flex-1 pt-10 px-4 m-auto text-center lg:text-left">
          <div className="font-semibold text-2xl sm:text-3xl pb-4">
            Join millions worldwide who automate their work using Zapier.
          </div>
          <div className="pb-4 pt-4">
            <CheckFeature label={"Easy setup, no coding required"} />
          </div>
          <div className="pb-4">
            <CheckFeature label={"Free forever for core features"} />
          </div>
          <div className="pb-4">
            <CheckFeature label={"14-day trial of premium features & apps"} />
          </div>
        </div>
        <div className="flex-1 mt-6 lg:mt-12 p-6 border rounded">
          <Input
            label={"Name"}
            placeholder="Your Name"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Input
            label={"Email"}
            placeholder="Your Email"
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            label={"Password"}
            placeholder="Password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="pt-4">
            <PrimaryButton size={"big"} onClick={handleClick}>
              Get started free
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
