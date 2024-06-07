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

  // Current version of the thumbnail
  const latestVersion = thumbnailData.versions.current;

  // Turn tag id strings into full tag objects
  const thumbnailTags = tags.filter((tag) =>
    latestVersion.tags.includes(tag.name)
  );

  return (
    <>
      <section>
        <div className="flex flex-col md:flex-row justify-between items-stretch">
          <div className="p-10 sm:p-12 size-full flex justify-center items-center">
            <div className="relative aspect-video w-full sm:max-w-[28rem] md:max-w-[38rem] bg-slate-50 overflow-hidden rounded-xl shadow-xl">
              <Image
                className="absolute inset-0 object-cover"
                src={latestVersion.thumbnails.maxres.url}
                width={latestVersion.thumbnails.maxres.width}
                height={latestVersion.thumbnails.maxres.height}
                alt={latestVersion.title}
              />
            </div>
          </div>
          <div className="w-full md:w-[34rem] border-t sm:boder-t md:border-l border-slate-100 backdrop-blur-sm px-5 sm:px-10 py-8 md:py-12 space-y-6 sm:space-y-8 min-h-full">
            <div className="flex justify-between items-center gap-6">
              <YTChannelDetails
                profilePic={dynamicYoutubeData.channel.thumbnails.high.url}
                channelTitle={dynamicYoutubeData.channel.title}
                subscriberCount={dynamicYoutubeData.channel.subscriberCount}
                customUrl={dynamicYoutubeData.channel.customUrl}
              />
              <div className="md:hidden flex justify-start items-center gap-3">
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
            <div className="flex justify-start items-start gap-2 flex-wrap max-w-full">
              {thumbnailTags.map((tag, index) => (
                <li key={index} className="list-none">
                  <Tag {...tag} />
                </li>
              ))}
            </div>
            <div className="hidden md:flex justify-start items-center gap-3">
              {/* Hide until collections feature is fully finished
              <ThumbnailInteraction
                thumbnailId={thumbnailData.id}
                type="save"
                savedBy={thumbnailData.meta.savedBy}
                big
              />
            */}
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
