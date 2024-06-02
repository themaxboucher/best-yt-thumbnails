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

export default async function ThumbnailPage({ params }) {
  // Get our own data
  const thumbnailData = await readThumbnailDoc(params.thumbnailSlug);

  if (!thumbnailData) {
    notFound();
  }

  // Get data from the YouTube API
  const youtubeData = await fetchYouTubeData(params.thumbnailSlug);
  const dynamicYoutubeData = youtubeData.dynamic;

  const latestVersion = thumbnailData.versions.current;
  const thumbnailTags = tags.filter((tag) =>
    latestVersion.tags.includes(tag.name)
  );

  return (
    <>
      <section>
        <div className="flex justify-between items-stretch">
          <div className="px-32 py-12 size-full">
            <div className="relative object-cover aspect-video w-full p-20 border border-slate-100 bg bg-slate-50 overflow-hidden rounded-xl shadow-xl">
              <Image
                className="aspect-video object-cover"
                src={latestVersion.thumbnails.maxres.url}
                alt={latestVersion.title}
                fill
              />
            </div>
          </div>
          <div className="w-[34rem] border-l border-slate-100 bg-white px-10 py-12 flex flex-col justify-start items-stretch gap-8 min-h-full">
            <YTChannelDetails
              profilePic={dynamicYoutubeData.channel.thumbnails.high.url}
              channelTitle={dynamicYoutubeData.channel.title}
              subscriberCount={dynamicYoutubeData.channel.subscriberCount}
              customUrl={dynamicYoutubeData.channel.customUrl}
            />
            <div className="space-y-2">
              <YTVideoTitle
                videoTitle={latestVersion.title}
                videoId={thumbnailData.video.id}
              />
              <YTVideoStats
                viewCount={thumbnailData.video.viewCount}
                publishedAt={dynamicYoutubeData.video.publishedAt}
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
                thumbnailId={thumbnailData.id}
                type="save"
                savedBy={thumbnailData.meta.savedBy}
                big
              />
              <ThumbnailInteraction
                thumbnailId={thumbnailData.id}
                type="favorite"
                favoritedBy={thumbnailData.meta.favoritedBy}
                big
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
