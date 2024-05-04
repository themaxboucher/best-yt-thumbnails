"use server";

import { google } from "googleapis";

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

export async function fetchYouTubeVideo(videoId) {
  try {
    const response = await youtube.videos.list({
      part: ["snippet", "statistics"],
      id: videoId,
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return null;
  }
}

export async function fetchYouTubeChannel(channelId) {
  try {
    const response = await youtube.channels.list({
      part: ["snippet", "statistics"],
      id: channelId,
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching YouTube channel:", error);
    return null;
  }
}

export async function fetchYouTubeData(id) {
  const videos = await fetchYouTubeVideo(id);
  if (videos.length !== 0) {
    const video = videos[0];

    const channels = await fetchYouTubeChannel(video.snippet.channelId);
    const channel = channels[0];

    const thumbnailData = {
      channel: {
        id: video.snippet.channelId,
        thumbnails: channel.snippet.thumbnails,
        customUrl: channel.snippet.customUrl,
        title: video.snippet.channelTitle,
        subscriberCount: channel.statistics.subscriberCount,
      },
      public: false,
      addedAt: "",
      statistics: { favorites: 0, saves: 0 },
      tags: [],
      thumbnails: video.snippet.thumbnails,
      video: {
        id: video.id,
        publishedAt: video.snippet.publishedAt,
        title: video.snippet.title,
        viewCount: video.statistics.viewCount,
      },
    };
    return thumbnailData;
  } else {
    return false;
  }
}
