const functions = require("firebase-functions");
const functionsV2 = require("firebase-functions/v2");
const admin = require("firebase-admin");
const { google } = require("googleapis");
const { defineSecret } = require("firebase-functions/params");

admin.initializeApp();

const firestore = admin.firestore();

// Define the YouTube API key as a secret
const youtubeApiKey = defineSecret("YOUTUBE_API_KEY");

// Cloud Function to update the thumbnail video view count statistic every hour
exports.updateViewCount = functionsV2.scheduler.onSchedule(
  {
    schedule: "every 60 minutes", // Schedule function to run every hour
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
          const viewCount = parseInt(
            response.data.items[0].statistics.viewCount,
            10
          );
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

// Cloud Function to create a user document in Firestore when a new user signs up
exports.createUserDocument = functions.auth.user().onCreate(async (user) => {
  // Get the user's ID
  const userId = user.uid;

  try {
    // Create a new document in the "users" collection with the user's ID
    await admin.firestore().collection("users").doc(userId).set({
      favorites: [],
    });
    console.log(`Successfully created user document for user ID: ${userId}`);
  } catch (error) {
    console.error(`Error creating user document for user ID: ${userId}`, error);
  }
});
