import readThumbnailDocs from "@/actions/readThumbnailDocs";
import ThumbnailCard from "./thumbnail-card";

export default async function ThumbnailGrid({ sortFilter, tagFilter }) {
  const thumbnails = await readThumbnailDocs(sortFilter, tagFilter);
  return (
    <>
      {thumbnails.length !== 0 ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 w-full auto-rows-auto gap-6">
          {thumbnails.map((thumbnail, index) => (
            <li key={thumbnail.id} className="list-none">
              <ThumbnailCard {...thumbnail} index={index} />
            </li>
          ))}
        </div>
      ) : (
        <div className="mt-10 flex justify-center items-center text-center">
          <p>No thumbnails could be found.</p>
        </div>
      )}
    </>
  );
}
