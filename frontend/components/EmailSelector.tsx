import { useState } from "react";
import { Input } from "./Input";
import { PrimaryButton } from "./buttons/PrimaryButton";

export const EmailSelector = ({
  setMetadata,
}: {
  setMetadata: (params: any) => void;
}) => {
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  return (
    <div className="p-2">
      <Input
        type={"text"}
        placeholder="To"
        label={"To"}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></Input>
      <Input
        type={"text"}
        placeholder="Body"
        label={"Body"}
        onChange={(e) => {
          setBody(e.target.value);
        }}
      ></Input>
      <div className="pt-4">
        <PrimaryButton
          onClick={() => {
            setMetadata({
              email,
              body,
            });
          }}
        >
          Submit
        </PrimaryButton>
      </div>
    </div>
  );
};
