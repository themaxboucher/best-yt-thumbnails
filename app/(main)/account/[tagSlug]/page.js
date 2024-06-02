"use client";

import ThumbnailGrid from "@/components/thumbnail-grid";
import { auth } from "@/data/firebase";
import slugifyLower from "@/helper-functions/slugifyLower";
import { notFound } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

export default function AccountPage({ params }) {
  const [user] = useAuthState(auth);
  const userThumbFilters = ["Favorites", "Submitted"];

  const pageSort = userThumbFilters.find(
    (filter) => slugifyLower(filter) === params.tagSlug
  );

  if (!pageSort) {
    notFound();
  }
  return <ThumbnailGrid sortFilter="Popular" />;
}
