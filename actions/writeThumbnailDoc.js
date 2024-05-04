"use server";

import { db } from "@/data/firebase";
import { addDoc, collection } from "firebase/firestore";

export default async function writeThumbnailDoc(thumbnailObj) {
  try {
    await addDoc(collection(db, "thumbnails"), thumbnailObj); // Potentially change to "setDoc()" with YouTube's provided Id
  } catch (error) {
    console.log(error);
  }
}
