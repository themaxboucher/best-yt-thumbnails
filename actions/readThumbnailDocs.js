"use server";

import { db } from "@/data/firebase";
import { collection, query, getDocs, where, limit, orderBy } from "firebase/firestore";

export default async function readThumbnailDocs(sortFilter, tagFilter) {
  console.log(`sortFilter = ${sortFilter} tagFilter = ${tagFilter}`);

  try {
    // Create a query based on the sort and tag filters
    // if tagFilter where("tags", "array-contains", tagFilter)
    // if sortFilter then find out what sortFilter to determine "orderBy"
    // Trending (default?): some combination of favorites and saves devided by when the thumbnail was added to the site
    // Popular: favorites and saves
    // Recently Added: most recently add (add field in db with server timestamp)
    // New on YouTube: check pulishedAt
    // Popular on YouTube: orderBy("video.viewCount", "desc"),
    // Channel Outliers: thumbnails belonging to videos that are significantly more popular then the rest of the channels videos
    let q;
    if (sortFilter && tagFilter) {
      q = query(
        collection(db, "thumbnails"),
        limit(80),
        orderBy("statistics.favorites"),
        where("tags", "array-contains", tagFilter)
      );
    } else if (sortFilter && !tagFilter) {
      q = query(
        collection(db, "thumbnails"),
        limit(80),
      );
    } else if (!sortFilter && tagFilter) {
      q = query(
        collection(db, "thumbnails"),
        limit(80),
        where("tags", "array-contains", tagFilter)
      );
    } else if (!sortFilter && !tagFilter) {
      q = query(collection(db, "thumbnails"), limit(80));
    }

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
