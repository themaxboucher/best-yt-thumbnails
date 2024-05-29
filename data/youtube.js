"use server";

import { google } from "googleapis";
import dynamic from "next/dynamic";

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
      dynamic: {
        channel: {
          thumbnails: channel.snippet.thumbnails,
          customUrl: channel.snippet.customUrl,
          title: video.snippet.channelTitle,
          subscriberCount: channel.statistics.subscriberCount,
        },
        video: {
          thumbnails: video.snippet.thumbnails,
          publishedAt: video.snippet.publishedAt,
          title: video.snippet.title,
          viewCount: video.statistics.viewCount,
        },
      },
      submit: {
        meta: {
          public: false,
          submittedAt: null,
          submittedBy: null,
          popularityScore: 0,
          favoritedBy: [],
          savedBy: [],
        },
        statistics: { favorites: 0, saves: 0 },
        versions: {
          current: {
            title: video.snippet.title,
            thumbnails: video.snippet.thumbnails,
            tags: [],
          },
          previous: [],
        },
        video: {
          id: video.id,
          publishedAt: video.snippet.publishedAt,
        },
      },
    };
    return thumbnailData;
  } else {
    return false;
  }
}
