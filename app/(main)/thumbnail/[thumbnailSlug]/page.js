import Tag from "@/components/tag";
import ThumbnailInteraction from "@/components/thumbnail-interaction";
import { tags } from "@/data/tags";
import Image from "next/image";
import { fetchYouTubeData } from "@/data/youtube";
import YTVideoStats from "@/components/yt-video-stats";
import YTChannelDetails from "@/components/yt-channel-details";
import YTVideoTitle from "@/components/yt-video-title";
import readThumbnailDoc from "@/actions/readThumbnailDoc";
import { notFound } from "next/navigation";
import LoadingCard from "@/components/loading/loading-card";
import SectionLarge from "@/components/layout/section-large";

export default async function ThumbnailPage({ params }) {
  // Get our own data
  const thumbnailData = await readThumbnailDoc(params.thumbnailSlug);

  if (!thumbnailData) {
    notFound();
  }

  // Get data from the YouTube API
  const youtubeData = await fetchYouTubeData(params.thumbnailSlug);

  // Fix
  const thumbnailTags = tags.filter((tag) =>
    thumbnailData.tags.includes(tag.name)
  );

  return (
    <>
      <section>
        <div className="flex justify-between items-stretch">
          <div className="px-32 py-12 size-full">
            <div className="relative object-cover aspect-video w-full p-20 border border-slate-100 bg bg-slate-50 overflow-hidden rounded-xl shadow-xl">
              <Image
                className="aspect-video object-cover"
                src={youtubeData.thumbnails.maxres.url}
                alt={youtubeData.video.title}
                fill
              />
            </div>
          </div>
          <div className="w-[34rem] border-l border-slate-100 px-10 py-12 flex flex-col justify-start items-stretch gap-8 min-h-full">
            <YTChannelDetails
              profilePic={youtubeData.channel.thumbnails.high.url}
              channelTitle={youtubeData.channel.title}
              subscriberCount={youtubeData.channel.subscriberCount}
              customUrl={youtubeData.channel.customUrl}
            />
            <div className="space-y-2">
              <YTVideoTitle
                videoTitle={youtubeData.video.title}
                videoId={youtubeData.video.id}
              />
              <YTVideoStats
                viewCount={youtubeData.video.viewCount}
                publishedAt={youtubeData.video.publishedAt}
              />
            </div>
            <div className="flex justify-start items-start gap-2 flex-wrap">
              {thumbnailTags.map((tag, index) => (
                <li key={index} className="list-none">
                  <Tag {...tag} />
                </li>
              ))}
            </div>

            <div className="flex justify-start items-center gap-3 mt-4">
              <ThumbnailInteraction
                type="save"
                number={youtubeData.statistics.saves}
                big
              />
              <ThumbnailInteraction
                type="favorite"
                number={youtubeData.statistics.favorites}
                big
              />
            </div>
          </div>
        </div>
      </section>
      {/*
      <SectionLarge>
        <h2 className="heading-3">More from channel</h2>
        <div className="flex justify-start items-center gap-2 w-full overflow-scroll">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </div>
      </SectionLarge>
      <section>
        <h2>Similar thumbnails</h2>
        <div></div>
      </section>
      */}
    </>
  );
}
