import SortMenu from "./sort-menu";
import TagSlider from "./tag-slider";

export default function FilterBar() {
  return (
    <div className="flex justify-between gap-4 w-full">
      <SortMenu />
      <TagSlider />
    </div>
  );
}
