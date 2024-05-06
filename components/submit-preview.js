import Image from "next/image";
import YTVideoTitle from "./yt-video-title";
import YTChannelDetails from "./yt-channel-details";
import YTVideoStats from "./yt-video-stats";

export default function SubmitPreview({
  isLoadingChange,
  isValidURL,
  thumbnailData,
}) {
  return (
    <div
      className={`flex flex-col gap-4 ease-out duration-300 ${
        isLoadingChange && "animate-pulse"
      } ${thumbnailData && (!isValidURL || URL === "") && "opacity-50"}`}
    >
      <div className="overflow-hidden rounded-xl">
        {thumbnailData ? (
          <Image
            className="aspect-video object-cover"
            src={thumbnailData.thumbnails.standard.url}
            alt={thumbnailData.video.title}
            width={thumbnailData.thumbnails.standard.width}
            height={thumbnailData.thumbnails.standard.height}
          />
        ) : (
          <div className="aspect-video object-cover bg-slate-100 border-2 border-slate-200 rounded-xl flex justify-center items-center"></div>
        )}
      </div>
      {thumbnailData ? (
        <YTVideoTitle videoTitle={thumbnailData.video.title} />
      ) : (
        <div className="bg-slate-200 my-2 h-5 w-[80%] rounded-lg"></div>
      )}
      <div className="flex justify-between items-center">
        {thumbnailData ? (
          <YTChannelDetails
            profilePic={thumbnailData.channel.thumbnails.high.url}
            channelTitle={thumbnailData.channel.title}
            subscriberCount={thumbnailData.channel.subscriberCount}
          />
        ) : (
          <div className="flex justify-start items-center gap-2">
            <div className="size-10 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 size-full bg-slate-200"></div>
            </div>
            <div>
              <div className="bg-slate-200 my-2 h-3 w-20 rounded-lg"></div>
              <div className="bg-slate-200 my-2 h-2 w-16 rounded-lg"></div>
            </div>
          </div>
        )}
        {thumbnailData ? (
          <YTVideoStats
            viewCount={thumbnailData.video.viewCount}
            publishedAt={thumbnailData.video.publishedAt}
          />
        ) : (
          <div className="flex justify-start items-center gap-5 text-sm font-medium text-slate-600">
            <div className="bg-slate-200 my-2 h-4 w-10 rounded-lg"></div>
            <div className="bg-slate-200 my-2 h-4 w-10 rounded-lg"></div>
          </div>
        )}
      </div>
    </div>
  );
}
