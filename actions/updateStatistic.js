"use server";

import { db } from "@/data/firebase";
import {
  arrayRemove,
  arrayUnion,
  doc,
  increment,
  updateDoc,
} from "firebase/firestore";

export default async function updateStatistic({
  type,
  userId,
  thumbnailId,
  remove,
  collectionId,
}) {
  if (!["favorite", "save"].includes(type)) {
    throw new Error(`Invalid type: ${type}`);
  }
  if (!userId || !thumbnailId) {
    throw new Error("userId and thumbnailId are required.");
  }

  // Determine the fields to update based on the action type
  const isFavorite = type === "favorite";
  const isSave = type === "save";

  const thumbUpdateArg = {
    "meta.popularityScore": !remove ? increment(1) : increment(-1),
    ...(isFavorite && {
      "statistics.favorites": !remove ? increment(1) : increment(-1),
      "meta.favoritedBy": !remove ? arrayUnion(userId) : arrayRemove(userId),
    }),
    ...(isSave && {
      "statistics.saves": !remove ? increment(1) : increment(-1),
      "meta.savedBy": !remove ? arrayUnion(userId) : arrayRemove(userId),
    }),
  };
  let userUpdateArg = {};
  if (isFavorite) {
    userUpdateArg = {
      favorites: !remove ? arrayUnion(thumbnailId) : arrayRemove(thumbnailId),
    };
  } else if (isSave) {
    userUpdateArg = {
      saved: !remove ? arrayUnion(thumbnailId) : arrayRemove(thumbnailId),
      numSaved: !remove ? increment(1) : increment(-1),
    };
  }

  const userDocPath =
    isSave && collectionId
      ? doc(db, "users", userId, "collections", collectionId)
      : doc(db, "users", userId);

  await updateDoc(doc(db, "thumbnails", thumbnailId), thumbUpdateArg);
  await updateDoc(userDocPath, userUpdateArg);
}
