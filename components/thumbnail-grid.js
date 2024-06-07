import readThumbnailDocs from "@/actions/readThumbnailDocs";
import ThumbnailCard from "./thumbnail-card";
import GridWrapper from "./layout/grid-wrapper";

export default async function ThumbnailGrid({ sortFilter, tagFilter }) {
  const thumbnails = await readThumbnailDocs({
    sortFilter: sortFilter,
    tagFilter: tagFilter,
  });
  return (
    <>
      {thumbnails.length !== 0 ? (
        <GridWrapper>
          {thumbnails.map((thumbnail, index) => (
            <li key={thumbnail.id} className="list-none">
              <ThumbnailCard {...thumbnail} index={index} />
            </li>
          ))}
        </GridWrapper>
      ) : (
        <div className="mt-10 flex justify-center items-center text-center">
          <p>No thumbnails could be found.</p>
        </div>
      )}
    </>
  );
}
