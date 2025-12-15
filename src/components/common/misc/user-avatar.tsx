"use client";

import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserAvatar() {
  const inputRef = useRef<HTMLInputElement>(undefined);

  const [avatar, setAvatar] = useState<File>();
  const [avatarUrl, setAvatarUrl] = useState<string>();

  useEffect(() => {
    if (!avatar) return;

    try {
      const url = URL.createObjectURL(avatar);
      setAvatarUrl(url);
    } catch (error) {
      setAvatarUrl("/media/placeholder.svg");
    }
  }, [avatar]);

  return (
    <div className="flex flex-col items-center justify-center  bg-transparent mt-4">
      <Avatar className="size-22 border border-medsave-black-100">
        <AvatarImage alt={avatar?.name} src={avatarUrl} />
        <AvatarFallback className="text-2xl font-bold bg-medsave-blue-500 text-background">
          {`NA`}
        </AvatarFallback>
      </Avatar>

      <input
        type="file"
        accept="image/*"
        ref={inputRef as React.Ref<HTMLInputElement>}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setAvatar(file);
          }
        }}
      />
      <button
        type="button"
        className="p-1.5 absolute border-2 border-white rounded-full bg-medsave-black-100 ml-15 mt-15 z-50"
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M10.4625 2.30664L13.5981 5.44225L5.21373 13.8266L2.08108 13.8237L2.07812 10.691L10.4625 2.30664Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
          <path
            d="M13.169 13.8236L2.08594 13.8232"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </svg>
      </button>
    </div>
  );
}
