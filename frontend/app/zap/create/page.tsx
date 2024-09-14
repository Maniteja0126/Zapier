"use client";

import { BACKEND_URL } from "@/app/config";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Modal } from "@/components/Modal";
import { ZapCell } from "@/components/ZapCell";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Create() {
  const { availableActions, availableTriggers } =
    useAvailableActionsAndTriggers();

  const [selectedTrigger, setSelectedTrigger] = useState<{
    id: string;
    name: string;
    image: string;
  }>();
  const [selectedActions, setSelectedActions] = useState<
    {
      index: number;
      availableActionId: string;
      availableActionName: string;
      availableImage: string;
      metadata : any;
    }[]
  >([]);
  const [selectedModelIndex, setSelectedModalIndex] = useState<null | number>(
    null
  );
  const router = useRouter();

  const handlePublish = async () => {
    if (!selectedTrigger?.id) {
      return;
    }

    try {

      await axios.post(`${BACKEND_URL}/api/v1/zap`, {
        'availableTriggerId': selectedTrigger.id,
        "triggerMetadata": "",
        "actions": selectedActions.map((a) => ({
          availableActionId: a.availableActionId,
          actionMetadata: a.metadata,
        })),
      }, {
        headers: {
          "Authorization": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Error publishing zap:", error);
    }
  };

  return (
    <div className=" w-full min-h-screen bg-slate-200 ">
      <div className="flex justify-end py-2 px-2">
        <PrimaryButton onClick={handlePublish}>Publish</PrimaryButton>
      </div>
      <div className="flex w-full min-h-screen flex-col justify-center">
        <div className="flex justify-center w-full">
          <ZapCell
            onClick={() => {
              setSelectedModalIndex(1);
            }}
            name={selectedTrigger?.name ? selectedTrigger.name : "Trigger"}
            index={1}
            image={selectedTrigger?.image}
          />
        </div>
        <div className="w-full">
          {selectedActions.map((action, index) => (
            <div key={index} className="flex justify-center pt-2">
              <ZapCell
                onClick={() => {
                  setSelectedModalIndex(action.index);
                }}
                name={
                  action.availableActionName
                    ? action.availableActionName
                    : "Action"
                }
                index={action.index}
                image={action.availableImage}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center pt-4">
          <div>
            <PrimaryButton
              onClick={() => {
                setSelectedActions((a) => [
                  ...a,
                  {
                    index: a.length + 2,
                    availableActionId: "",
                    availableActionName: "",
                    availableImage: "",
                    metadata:{}
                  },
                ]);
              }}
            >
              <div className="text-2xl ">+</div>
            </PrimaryButton>
          </div>
        </div>
        {selectedModelIndex && (
          <Modal
            index={selectedModelIndex}
            availableItems={
              selectedModelIndex === 1 ? availableTriggers : availableActions
            }
            onSelect={(
              props: null | { name: string; id: string; image: string ; metadata : any}
            ) => {
              if (props === null) {
                setSelectedModalIndex(null);
                return;
              }
              if (selectedModelIndex === 1) {
                setSelectedTrigger({
                  id: props.id,
                  name: props.name,
                  image: props.image,
                });
              } else {
                setSelectedActions((a) => {
                  let newActions = [...a];
                  newActions[selectedModelIndex - 2] = {
                    index: selectedModelIndex,
                    availableActionId: props.id,
                    availableActionName: props.name,
                    availableImage: props.image,
                    metadata : props.metadata

                  };
                  return newActions;
                });
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

function useAvailableActionsAndTriggers() {
  const [availableActions, setAvailableActions] = useState([]);
  const [availableTriggers, setAvailableTriggers] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/trigger/available`)
      .then((x) => setAvailableTriggers(x.data.availableTriggers));

    axios
      .get(`${BACKEND_URL}/api/v1/action/available`)
      .then((x) => setAvailableActions(x.data.availableActions));
  }, []);

  return { availableActions, availableTriggers };
}
