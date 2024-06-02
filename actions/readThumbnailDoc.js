"use server";

import { db } from "@/data/firebase";
import { collection, query, getDocs, where, limit } from "firebase/firestore";

export default async function readThumbnailDoc(videoId) {
  try {
    const q = query(
      collection(db, "thumbnails"),
      limit(1),
      where("video.id", "==", videoId)
    );
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
    return fetchedData[0];
  } catch (error) {
    console.log(error);
    return false;
  }
}
