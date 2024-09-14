import { Zap } from "@/types/types";
import { LinkButton } from "./buttons/LinkButton";
import { useRouter } from "next/navigation";
import { HOOK_URL } from "@/app/config";
import Image from "next/image";

export const ZapTable = ({ zaps }: { zaps: Zap[] }) => {
  const router = useRouter();
  return (
    <div className="p-8 max-w-screen-lg w-full">
      <div className="grid grid-cols-5 font-bold py-2 border-b  ">
        <div>Name</div>
        <div>ID</div>
        <div>Created At</div>
        <div>Webhook URL</div>
        <div className="text-center">Go</div>
      </div>
      {zaps.map((z) => (
        <div key={z.id} className="grid grid-cols-5 py-4 border-b">
          <div className="flex items-center space-x-2">
            <Image
              src={z.trigger?.type.image}
              width={30}
              height={30}
              className="rounded-full"
              alt="Trigger Icon"
            />
            {z.actions.map((x) => (
              <Image
                src={x.type.image}
                key={x.type.id}
                width={30}
                height={30}
                className="rounded-full"
                alt="Action Icon"
              />
            ))}
          </div>

          <div>{z.id}</div>

          <div>Sep 09, 2024</div>

          <div className="truncate">{`${HOOK_URL}/hooks/catch/1/${z.id}`}</div>

          <div>
            <LinkButton
              onClick={() => {
                router.push("/zap/create");
              }}
            >
              Go
            </LinkButton>
          </div>
        </div>
      ))}
    </div>
  );
};
