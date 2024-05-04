export default function getYouTubeVideoId(url) {
  // Regular expression to match YouTube video ID
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    // If the regex matches and the video ID is found
    return match[2];
  } else {
    // If the URL is invalid or doesn't contain a valid video ID
    return null;
  }
}
