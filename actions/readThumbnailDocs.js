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

export default async function readThumbnailDocs({
  sortFilter,
  tagFilter,
  userList,
  userId,
}) {
  try {
    // Create a query based on the sort and tag filters
    const queryArgs = [collection(db, "thumbnails"), limit(80)]; // Implement pagination

    // Add query arguments based on the tag filter
    if (tagFilter) {
      queryArgs.push(
        where("versions.current.tags", "array-contains", tagFilter)
      );
    }

    // Add query arguments based on the sort filter
    if (sortFilter === "Popular") {
      queryArgs.push(orderBy("statistics.favorites", "desc"));
    } else if (sortFilter === "Recently Added") {
      queryArgs.push(orderBy("meta.submittedAt", "desc"));
    } else if (sortFilter === "Popular on YouTube") {
      queryArgs.push(orderBy("video.viewCount", "desc"));
    } else if (sortFilter === "New on YouTube") {
      queryArgs.push(orderBy("video.publishedAt", "desc"));
    }

    // Add query arguments based on the user list
    if (userList === "Favorites") {
      queryArgs.push(where("meta.favoritedBy", "array-contains", userId));
    } else if (userList === "Submitted") {
      queryArgs.push(where("meta.submittedBy", "==", userId));
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
