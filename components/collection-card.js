import abbreviateNumber from "@/helper-functions/abbreviateNumber";
import Image from "next/image";
import Link from "next/link";
import { HiRectangleStack } from "react-icons/hi2";

export default function CollectionCard({ name, numSaved, saved }) {
  return (
    <Link
      href={`/collection/${1}`}
      className="w-full max-w-96 flex flex-col gap-2 group"
    >
      <div className="pt-9 rounded-lg overflow-hidden">
        <div className="relative rounded-lg size-full aspect-video">
          <Image
            className="aspect-video object-cover absolute bottom-0 right-0 left-0 shadow-[0px_-4px_6px_-1px_rgba(0,0,0,0.1)] bg-slate-100 border border-slate-100 rounded-lg overflow-hidden"
            src={"https://i.ytimg.com/vi/3BXP5XAkPt4/sddefault.jpg"}
            width={640}
            height={480}
          />
          <Image
            className="aspect-video object-cover absolute -z-10 bottom-3 group-hover:bottom-[1.15rem] right-0 left-0 shadow-[0px_-4px_6px_-1px_rgba(0,0,0,0.1)] bg-slate-100 border border-slate-100 rounded-lg overflow-hidden ease-out duration-150"
            src={"https://i.ytimg.com/vi/3BXP5XAkPt4/sddefault.jpg"}
            width={640}
            height={480}
          />
          <Image
            className="aspect-video object-cover absolute -z-20 bottom-6 group-hover:bottom-9 right-0 left-0 bg-slate-100 border border-slate-100 rounded-lg overflow-hidden ease-out duration-300"
            src={"https://i.ytimg.com/vi/3BXP5XAkPt4/sddefault.jpg"}
            width={640}
            height={480}
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center gap-2 w-full">
          <p className="font-medium text-sm text-slate-900">{name}</p>
          <div
            className="flex justify-end items-center gap-1 text-slate-400 text-xs"
            title={`${abbreviateNumber(numSaved)} thumbnails`}
          >
            <HiRectangleStack className="size-[1.1rem]" />
            <div className="text-slate-700 font-medium ">
              {abbreviateNumber(numSaved)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
