import readThumbnailDoc from "@/actions/readThumbnailDoc";
import GridWrapper from "./layout/grid-wrapper";
import ThumbnailCard from "./thumbnail-card";

export default async function CollectionThumbnails({ saved }) {
  const thumbnails = saved.map(async (thumbId) => {
    const thumbnail = await readThumbnailDoc(thumbId);
    return thumbnail;
  });
  return (
    <GridWrapper>
      {thumbnails.map((thumbnail, index) => (
        <li key={thumbnail.id} className="list-none">
          <ThumbnailCard {...thumbnail} index={index} />
        </li>
      ))}
    </GridWrapper>
  );
}
