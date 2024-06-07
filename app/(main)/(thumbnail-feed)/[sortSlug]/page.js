import ThumbnailGrid from "@/components/thumbnail-grid";
import { sortFilters } from "@/data/sortFilters";
import slugifyLower from "@/helper-functions/slugifyLower";
import { notFound } from "next/navigation";

export default function SortPage({ params }) {
  const pageSort = sortFilters.find(
    (sortFilter) => slugifyLower(sortFilter) === params.sortSlug
  );

  if (!pageSort) {
    notFound();
  }

  return <ThumbnailGrid sortFilter={pageSort} />;
}
