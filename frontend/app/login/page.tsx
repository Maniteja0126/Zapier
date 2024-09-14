"use client";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Input } from "@/components/Input";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex justify-center px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row pt-8 max-w-6xl">
        <div className="flex-1 pt-10 px-4 m-auto text-center lg:text-left">
          <div className="font-semibold text-3xl sm:text-4xl pb-4">
            Automate across your teams
          </div>
          <div className="text-lg sm:text-xl">
            Zapier Enterprise empowers everyone in your business to securely
            automate their work in minutes, not months—no coding required.
          </div>
        </div>
        <div className="flex-1 mt-6 lg:mt-12 p-6 border rounded">
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
            <PrimaryButton
              size={"big"}
              onClick={async () => {
                const res = await axios.post(
                  `${BACKEND_URL}/api/v1/user/signin`,
                  {
                    username : email,
                    password,
                  }
                );
                localStorage.setItem("token", res.data.token);
                router.push("/dashboard");
              }}
            >
              Login
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
