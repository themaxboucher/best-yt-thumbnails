export default function YTVideoTitle({ videoTitle, videoId }) {
  return (
    <a href={videoId && `https://www.youtube.com/watch?v=${videoId}`} target="_blank">
      <p className="text-slate-900 font-medium text-pretty">{videoTitle}</p>
    </a>
  );
}
