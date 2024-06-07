import { tags } from "@/data/tags";
import SortMenu from "./sort-menu";
import TagSlider from "./tag-slider";

export default function FilterBar() {
  return (
    <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between gap-4 w-full">
      <SortMenu />
      <TagSlider tags={[{ name: "All" }, ...tags]} />
    </div>
  );
}
