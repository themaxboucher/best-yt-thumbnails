const functions = require("firebase-functions/v2");
const admin = require("firebase-admin");
const { google } = require("googleapis");
const { defineSecret } = require("firebase-functions/params");

admin.initializeApp();

const firestore = admin.firestore();

// Define the YouTube API key as a secret
const youtubeApiKey = defineSecret("YOUTUBE_API_KEY");

// Schedule function to run every hour
exports.updateViewCount = functions.scheduler.onSchedule(
  {
    schedule: "every 60 minutes",
    secrets: [youtubeApiKey],
  },
  async (event) => {
    const youtube = google.youtube({
      version: "v3",
      auth: youtubeApiKey.value(),
    });

    const thumbnailsRef = firestore.collection("thumbnails");
    const thumbnailsSnapshot = await thumbnailsRef.get();

    // Iterate over each document in the thumbnails collection
    for (const thumbnailDoc of thumbnailsSnapshot.docs) {
      const videoId = thumbnailDoc.data().video.id;

      try {
        const response = await youtube.videos.list({
          part: "statistics",
          id: videoId,
        });

        if (response.data.items.length > 0) {
          const viewCount = response.data.items[0].statistics.viewCount;
          await thumbnailDoc.ref.update({
            "video.viewCount": viewCount,
          });
        } else {
          throw new Error(`No statistics found for video ${videoId}`);
        }
      } catch (error) {
        console.error(`Error fetching/view count for video ${videoId}:`, error);
      }
    }
  }
);
