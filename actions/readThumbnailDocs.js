"use server";

import { db } from "@/data/firebase";
import {
  collection,
  query,
  getDocs,
  where,
  limit,
  orderBy,
} from "firebase/firestore";

export default async function readThumbnailDocs(sortFilter, tagFilter) {
  try {
    // Create a query based on the sort and tag filters
    const queryArgs = [collection(db, "thumbnails"), limit(80)]; // Implement pagination
    if (tagFilter) {
      queryArgs.push(
        where("versions.current.tags", "array-contains", tagFilter)
      );
    }
    if (sortFilter === "Popular") {
      queryArgs.push(orderBy("meta.popularityScore", "desc"));
    } else if (sortFilter === "Recently Added") {
      queryArgs.push(orderBy("meta.submittedAt", "desc"));
    } else if (sortFilter === "New on YouTube") {
      queryArgs.push(orderBy("video.publishedAt", "desc"));
    }
    const q = query(...queryArgs);
    const querySnapshot = await getDocs(q);
    const fetchedData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return fetchedData;
  } catch (error) {
    console.log(error);
    return [];
  }
}
