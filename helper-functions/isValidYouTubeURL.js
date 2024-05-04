export default function isValidYouTubeURL(url) {
  // Regular expression to match YouTube video URLs
  const pattern =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})(.*)?$/;
  return pattern.test(url);
}
