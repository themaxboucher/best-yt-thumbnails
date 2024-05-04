"use client";

import abbreviateNumber from "@/helper-functions/abbreviateNumber";
import { AuthModalContext } from "@/store/auth-modal-context";
import { useContext } from "react";
import { FaBookmark, FaFire } from "react-icons/fa6";

export default function ThumbnailInteraction({ type, number, big }) {
  const useAuthModalContext = useContext(AuthModalContext);

  // If it's the favorite fire icon, make it orange
  const classes = `${
    type === "favorite" ? "hover:text-orange-500" : "hover:text-slate-600"
  } ${
    big && "bg-white p-2 border-[1.5px] border-slate-100 rounded-full"
  } active:scale-110 ease-out duration-300 cursor-pointer`;

  return (
    <div className="flex justify-end items-center gap-1 text-slate-400 text-xs">
      <button onClick={useAuthModalContext.openAuthModal} className={classes}>
        {type === "save" && <FaBookmark className="size-4" />}
        {type === "favorite" && <FaFire className="size-4" />}
      </button>
      {!big && (
        <div className="text-slate-700 font-medium ">
          {abbreviateNumber(number)}
        </div>
      )}
    </div>
  );
}
