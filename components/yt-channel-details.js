import abbreviateNumber from "@/helper-functions/abbreviateNumber";
import Image from "next/image";

export default function YTChannelDetails({
  profilePic,
  channelTitle,
  subscriberCount,
  customUrl,
}) {
  return (
    <a
      href={customUrl && `https://www.youtube.com/${customUrl}`}
      target="_blank"
      className="flex justify-start items-center gap-3"
    >
      <div className="size-10 rounded-full relative overflow-hidden bg-slate-100">
        <Image src={profilePic} alt={channelTitle} fill />
      </div>
      <div>
        <p className="text-slate-900 font-medium text-sm">{channelTitle}</p>
        <p className="text-xs">
          {abbreviateNumber(subscriberCount)} subscribers
        </p>
      </div>
    </a>
  );
}
