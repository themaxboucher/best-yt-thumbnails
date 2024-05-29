"use server";

import { db } from "@/data/firebase";
import { Timestamp, doc, serverTimestamp, setDoc } from "firebase/firestore";

export default async function createThumbnailDoc(dataObj, docId) {
  dataObj.meta.submittedAt = serverTimestamp();
  const videoPublishDate = new Date(dataObj.video.publishedAt)
  dataObj.video.publishedAt = Timestamp.fromDate(videoPublishDate);
  try {
    await setDoc(doc(db, "thumbnails", docId), dataObj);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
