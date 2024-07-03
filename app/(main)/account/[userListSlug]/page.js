"use client";

import readThumbnailDocs from "@/actions/readThumbnailDocs";
import GridWrapper from "@/components/layout/grid-wrapper";
import LoadingGrid from "@/components/loading/loading-cards";
import ThumbnailCard from "@/components/thumbnail-card";
import { auth } from "@/data/firebase";
import { userLists } from "@/data/userLists";
import slugifyLower from "@/helper-functions/slugifyLower";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function AccountListPage({ params }) {
  const [user, loading] = useAuthState(auth);
  const [thumbnails, setThumbnails] = useState(null);

  const pageList = userLists.find(
    (list) => slugifyLower(list.name) === params.userListSlug
  );

  if (!pageList) {
    notFound();
  }

  useEffect(() => {
    if (!loading) {
      async function fetchThumbnails() {
        const fetchedThumbnails = await readThumbnailDocs({
          userList: pageList.name,
          userId: user.uid,
        });
        setThumbnails(fetchedThumbnails);
      }
      fetchThumbnails(params.userListSlug);
    }
  }, [loading, pageList.name, user.uid, params.userListSlug]);
  return (
    <>
      {thumbnails === null ? (
        <LoadingGrid rows={4} />
      ) : (
        <>
          {thumbnails.length !== 0 ? (
            <GridWrapper>
              {thumbnails.map((thumbnail, index) => (
                <li key={thumbnail.id} className="list-none">
                  <ThumbnailCard {...thumbnail} index={index} />
                </li>
              ))}
            </GridWrapper>
          ) : (
            <div className="mt-10 flex justify-center items-center text-center">
              <p>No thumbnails could be found.</p>
            </div>
          )}
        </>
      )}
    </>
  );
}
