import ThumbnailGrid from "@/components/thumbnail-grid";
import { sortFilters } from "@/data/sortFilters";
import { tags } from "@/data/tags";
import slugifyLower from "@/helper-functions/slugifyLower";
import { notFound } from "next/navigation";

export default function TagPage({ params }) {
  const pageSort = sortFilters.find(
    (sortFilter) => slugifyLower(sortFilter) === params.sortSlug
  );
  const pageTag = tags.find(
    (tagObj) => slugifyLower(tagObj.name) === params.tagSlug
  );

  if (!pageSort || !pageTag) {
    notFound();
  }
  return <ThumbnailGrid sortFilter={pageSort} tagFilter={pageTag.name} />;
}
