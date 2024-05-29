"use client";

import readThumbnailDoc from "@/actions/readThumbnailDoc";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CollectionCover({ collectionSaved }) {
  const [coverThumb, setCoverThumb] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (collectionSaved.length > 0) {
      async function fetchCoverThumbnail() {
        const coverThumbId = collectionSaved[0];
        const fetchedThumb = await readThumbnailDoc(coverThumbId);
        setCoverThumb(fetchedThumb.versions.current.thumbnails.standard.url);
        setLoading(false);
      }
      fetchCoverThumbnail();
    }
  }, [collectionSaved]);

  return (
    <div
      className={`${
        loading && "animate-pulse"
      } relative aspect-video h-14 rounded-md bg-slate-100 overflow-hidden group flex justify-center items-center`}
    >
      {coverThumb && (
        <Image
          className="aspect-video object-cover"
          src={coverThumb}
          fill
          priority
        />
      )}
    </div>
  );
}
