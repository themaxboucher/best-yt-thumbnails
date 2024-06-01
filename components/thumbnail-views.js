import abbreviateNumber from "@/helper-functions/abbreviateNumber";
import { AiFillEye } from "react-icons/ai";

export default function ThumbnailViews({ viewCount }) {
  return (
    <div
      className="flex justify-end items-center gap-1 text-slate-400 text-xs"
      title={`${abbreviateNumber(viewCount)} views on YouTube`}
    >
      <AiFillEye className="size-[1.1rem]" />
      <div className="text-slate-700 font-medium ">
        {abbreviateNumber(viewCount)}
      </div>
    </div>
  );
}
