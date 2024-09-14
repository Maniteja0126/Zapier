"use client";
import { DarkButton } from "@/components/buttons/DarkButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { ZapTable } from "@/components/ZapTable";
import { Zap } from "@/types/types";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { loading, zaps } = useZaps();
  const router = useRouter();
  return (
    <div className="px-4">
      <div className="flex justify-center pt-8">
        <div className="max-w-screen-lg w-full">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:pr-8">
            <div className="text-2xl font-bold mb-4 sm:mb-0">My Zaps</div>
            <DarkButton
              onClick={() => {
                router.push("/zap/create");
              }}
            >
              Create
            </DarkButton>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center py-4">Loading...</div>
      ) : (
        <div className="flex justify-center w-full pt-4">
          <ZapTable zaps={zaps} />
        </div>
      )}
    </div>
  );
}

function useZaps() {
  const [loading, setLoading] = useState(true);
  const [zaps, setZaps] = useState<Zap[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/zap`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setZaps(res.data.zaps);
        setLoading(false);
      });
  }, []);
  return { loading, zaps };
}
