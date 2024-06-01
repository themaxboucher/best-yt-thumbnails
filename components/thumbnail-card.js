import Image from "next/image";
import Tag from "./tag";
import ThumbnailInteraction from "./thumbnail-interaction";
import Link from "next/link";
import { tags } from "@/data/tags";
import ThumbnailViews from "./thumbnail-views";

export default function ThumbnailCard(props) {
  const latestVersion = props.versions.current;
  const thumbnailTags = tags.filter((tag) =>
    latestVersion.tags.includes(tag.name)
  );

  return (
    <div className="w-full max-w-80 min-w-48 flex flex-col gap-2 relative">
      <Link
        href={`thumbnail/${props.video.id}`}
        className="relative rounded-lg overflow-hidden group bg-slate-50 flex justify-center items-center"
      >
        <div className="opacity-0 group-hover:opacity-100 ease-out duration-300 bg-gradient-to-t from-slate-950/80 to-transparent to-70% absolute inset-0 z-10 size-full flex flex-col justify-end p-4">
          <div className="flex justify-between items-center gap-4">
            <p className="text-white font-medium text-sm">
              {/* Limit to two lines */}
              {latestVersion.title}
            </p>
          </div>
        </div>
        <Image
          className="aspect-video object-cover"
          src={latestVersion.thumbnails.standard.url}
          alt={latestVersion.title}
          width={latestVersion.thumbnails.standard.width}
          height={latestVersion.thumbnails.standard.height}
          priority={props.index < 12}
        />
      </Link>
      <div className="flex justify-between items-center">
        <div className="relative w-full overflow-hidden">
          <div className="flex justify-start items-center gap-1 no-scrollbar overflow-x-scroll scroll-smooth h-7 w-full pr-5">
            {thumbnailTags.map((tag, index) => (
              <div key={index}>
                <Tag {...tag} />
              </div>
            ))}
          </div>
          <div className="absolute w-5 z-10 right-0 top-0 bottom-0 h-full bg-gradient-to-r from-transparent to-white"></div>
        </div>
        <div className="flex justify-end items-center gap-2 w-min h-full pl-4">
          <ThumbnailInteraction
            type="favorite"
            number={props.statistics.favorites}
            favoritedBy={props.meta.favoritedBy}
            thumbnailId={props.id}
          />
          <ThumbnailViews viewCount={props.video.viewCount} />
        </div>
      </div>
    </div>
  );
}
