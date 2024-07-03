"use client";

import { useEffect, useState } from "react";
import Button from "./ui/button";
import readCollections from "@/actions/readCollections";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/data/firebase";
import { CgSpinner } from "react-icons/cg";
import CollectionSelectCard from "./collection-select-card";

export default function SelectCollectionsForm({
  setIsCreateCollection,
  closeModal,
  thumbnailId,
}) {
  const [user, loading] = useAuthState(auth);
  const [collections, setCollections] = useState("loading");

  // Fetch collections when user is loaded
  useEffect(() => {
    if (!loading) {
      async function fetchCollections() {
        const fetchedCollections = await readCollections(user.uid);
        setCollections(fetchedCollections);
      }
      fetchCollections();
    }
  }, [loading, user.uid]);

  // Show create collection form
  function onClickHandler() {
    setIsCreateCollection(true);
  }

  // Close the modal
  async function onSubmitHandler(e) {
    e.preventDefault();
    closeModal();
  }

  return (
    <>
      <h3 className="font-medium">Save to collection</h3>
      <form onSubmit={onSubmitHandler}>
        <div className="h-56 mb-8 mt-2">
          <div className="relative size-full">
            <div className="absolute z-20 bg-gradient-to-b from-white to-transparent top-0 right-0 left-0 w-full h-4"></div>
            <div className="absolute z-20 bg-gradient-to-t from-white to-transparent bottom-0 right-0 left-0 w-full h-4"></div>
            <div className="py-4 size-full overflow-y-scroll no-scrollbar space-y-3">
              {collections !== "loading" ? (
                <>
                  {collections.length !== 0 ? (
                    collections.map((collection) => (
                      <div key={collection.id}>
                        <CollectionSelectCard
                          thumbnailId={thumbnailId}
                          collection={collection}
                          userId={user.uid}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col justify-center items-center size-full">
                      <p className="text-center text-sm">
                        No collections found.
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col justify-center items-center size-full">
                  <CgSpinner className="size-6 animate-spin" />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center gap-8">
          <Button onClick={onClickHandler} secondary type="button">
            Create collection
          </Button>
          <Button type="submit">Done</Button>
        </div>
      </form>
    </>
  );
}
