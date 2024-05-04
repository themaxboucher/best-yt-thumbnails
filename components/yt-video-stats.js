import abbreviateNumber from "@/helper-functions/abbreviateNumber";
import timeAgo from "@/helper-functions/timeAgo";
import { AiFillEye } from "react-icons/ai";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { HiCalendar } from "react-icons/hi";

export default function YTVideoStats({ viewCount, publishedAt, videoRank }) {
  return (
    <div className="flex justify-start items-center gap-5 text-sm font-medium text-slate-600">
      {viewCount && (
        <div
          className="flex justify-center items-center gap-1 cursor-default"
          title={`${abbreviateNumber(viewCount)} views`}
        >
          <AiFillEye className="size-4" />
          <span>{abbreviateNumber(viewCount)}</span>
        </div>
      )}
      {publishedAt && (
        <div
          className="flex justify-center items-center gap-1 cursor-default"
          title={`Published ${timeAgo(publishedAt)}`}
        >
          <HiCalendar className="size-4" />
          <span>{timeAgo(publishedAt)}</span>
        </div>
      )}
      {videoRank && (
        <div
          className="flex justify-center items-center gap-1 cursor-default"
          title={`Published`}
        >
          <FaArrowAltCircleUp className="size-4" />
          <span>{videoRank}</span>
        </div>
      )}
    </div>
  );
}
