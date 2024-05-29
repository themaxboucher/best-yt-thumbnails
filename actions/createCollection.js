"use server";

import { db } from "@/data/firebase";
import { addDoc, collection } from "firebase/firestore";

export default async function createCollection(userId, dataObj) {
  await addDoc(collection(db, "users", userId, "collections"), dataObj);
}
