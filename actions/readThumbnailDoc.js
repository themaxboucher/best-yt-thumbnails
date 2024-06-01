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
    const fetchedData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Turn Firestore timestamps into strings
    const thumbDoc = fetchedData[0];
    thumbDoc.meta.submittedAt = thumbDoc.meta.submittedAt
      .toDate()
      .toDateString();
    thumbDoc.video.publishedAt = thumbDoc.video.publishedAt
      .toDate()
      .toDateString();

    return thumbDoc;
  } catch (error) {
    console.log(error);
    return false;
  }
}
