import { ReactNode } from "react";

export const PrimaryButton = ({
  children,
  onClick,
  size = "small",
}: {
  children: ReactNode;
  onClick: () => void;
  size?: "big" | "small";
}) => {
  return (
    <div
      onClick={onClick}
      className={`${size === "small" ? "text-sm" : "text-xl"}  ${
        size === "small" ? "px-4 py-2" : "px-14 py-3"
      } bg-amber-700 text-white rounded-full hover:shadow-md cursor-pointer text-center`}
    >
      {children}
    </div>
  );
};
