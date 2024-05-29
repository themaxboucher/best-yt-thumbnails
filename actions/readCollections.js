"use server";

import { db } from "@/data/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function readCollections(userId) {
  try {
    const querySnapshot = await getDocs(
      collection(db, "users", userId, "collections")
    ); // Get all documents from users collections
    const fetchedData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return fetchedData;
  } catch (error) {
    console.log(error);
    return false;
  }
}
