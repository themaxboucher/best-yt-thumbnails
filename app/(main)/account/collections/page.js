"use client";

import readCollections from "@/actions/readCollections";
import CollectionCard from "@/components/collection-card";
import GridWrapper from "@/components/layout/grid-wrapper";
import { auth } from "@/data/firebase";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function AccountCollectionsPage() {
  notFound(); // Hide until collections feature is ready
  const [user, loading] = useAuthState(auth);
  const [collections, setCollections] = useState(null);

  useEffect(() => {
    if (!loading) {
      async function fetchCollections() {
        const fetchedCollections = await readCollections(user.uid);
        setCollections([...fetchedCollections]);
      }
      fetchCollections();
    }
  }, [loading]);
  return (
    <>
      {collections === null ? (
        <div className="mt-10 flex justify-center items-center text-center">
          <p>Loading...</p>
        </div>
      ) : (
        <GridWrapper>
          {collections.map((collection, index) => (
            <CollectionCard {...collection} key={index} />
          ))}
        </GridWrapper>
      )}
    </>
  );
}
