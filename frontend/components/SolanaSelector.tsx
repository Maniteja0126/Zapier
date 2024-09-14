import { useState } from "react";
import { Input } from "./Input";
import { PrimaryButton } from "./buttons/PrimaryButton";

export const SolanaSelector = ({
  setMetadata,
}: {
  setMetadata: (params: any) => void;
}) => {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  return (
    <div>
      <Input
        type={"text"}
        placeholder="To"
        label={"To"}
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      ></Input>
      <Input
        type={"text"}
        placeholder="Amount"
        label={"Amount"}
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      ></Input>
      <PrimaryButton onClick={() => {
        setMetadata({amount , address})
      }}>Submit</PrimaryButton>
    </div>
  );
};
