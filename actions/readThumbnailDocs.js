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
      queryArgs.push(orderBy("statistics.favorites", "desc"));
    } else if (sortFilter === "Recently Added") {
      queryArgs.push(orderBy("meta.submittedAt", "desc"));
    } else if (sortFilter === "Popular on YouTube") {
      queryArgs.push(orderBy("video.viewCount", "desc"));
    } else if (sortFilter === "New on YouTube") {
      queryArgs.push(orderBy("video.publishedAt", "desc"));
    }
    const q = query(...queryArgs);
    const querySnapshot = await getDocs(q);
    const fetchedData = querySnapshot.docs.map((doc) => {
      // Get the document data
      const data = doc.data();

      // Destructure nested fields to modify them
      const { meta, video } = data;

      return {
        id: doc.id,
        ...data,

        // Turn Firestore timestamps into strings
        meta: {
          ...meta,
          submittedAt: meta.submittedAt.toDate().toDateString(),
        },
        video: {
          ...video,
          publishedAt: video.publishedAt.toDate().toDateString(),
        },
      };
    });
    return fetchedData;
  } catch (error) {
    console.log(error);
    return [];
  }
}
