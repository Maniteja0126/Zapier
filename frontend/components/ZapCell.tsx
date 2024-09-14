import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export const ZapCell = ({
  name ,
  index,
  image,
  onClick,
}: {
  name?: string;
  index: number;
  image?: string;
  onClick: () => void;
}) => {
  const [isImageBroken, setIsImageBroken] = useState(!image);

  useEffect(() => {
    setIsImageBroken(!image);
  }, [image]);

  const FallBackImage = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      height="16"
      width="16"
      className="16"
      color="neutral700"
      name="miscBolt"
    >
      <path
        fill="#2D2E2E"
        d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm4.87-11L11 18v-5H7.13L13 6v5h3.87Z"
      ></path>
    </svg>
  );

  return (
    <div
      onClick={onClick}
      className="border border-black py-8 px-8 flex justify-center cursor-pointer w-[300px] rounded"
    >
      <div className="flex text-xl items-center">
        <div className="font-bold">{index}.</div>
        <div className="mr-1 ml-1">
          {isImageBroken ? (
            <FallBackImage />
          ) : (
            <Image
              src={image || ""}
              className="rounded-full w-7 h-7"
              alt={name || ""}
              width={7}
              height={7}
              onError={() => setIsImageBroken(true)} 
            />
          )}
        </div>
        <div>{name}</div>
      </div>
    </div>
  );
};
