"use client";

import Link from "next/link";
import TagSelector from "./tag-selector";
import { sortFilters } from "@/data/sortFilters";
import slugifyLower from "@/helper-functions/slugifyLower";
import breakdownSlug from "@/helper-functions/breakdownSlug";
import { usePathname } from "next/navigation";
import { FaBookmark, FaCirclePlus, FaFire, FaYoutube } from "react-icons/fa6";

// Needs refactoring
export default function Tag({
  name,
  description,
  refImage,
  color,
  select,
  selectedTags,
  setSelectedTags,
  big,
  isUserList,
}) {
  const pathname = usePathname();

  // Check if the tag is active
  const tagIsActive =
    sortFilters.find(
      (sortFilter) =>
        pathname === `/${slugifyLower(sortFilter)}/${slugifyLower(name)}`
    ) ||
    (select && selectedTags.find((selectedtag) => selectedtag === name)) ||
    (isUserList && pathname === `/account/${slugifyLower(name)}`);

  // Get current sort filter from the current path
  const slugParts = breakdownSlug(pathname);
  const slugStart = slugParts[0];
  const slugifiedSortFilters = sortFilters.map((filter) =>
    slugifyLower(filter)
  );
  const hasSortFilter = slugifiedSortFilters.includes(slugStart);

  // Create the tags link path based on the current sort filter
  function pathConstructor() {
    if (isUserList) {
      return `/account/${slugifyLower(name)}`;
    } else if (hasSortFilter) {
      const currentSortFilter = slugStart;
      if (name === "All") {
        return `/${currentSortFilter}`;
      } else {
        return `/${currentSortFilter}/${slugifyLower(name)}`;
      }
    } else {
      if (name == "All") {
        return `/${slugifyLower(sortFilters[0])}`;
      } else {
        return `/${slugifyLower(sortFilters[0])}/${slugifyLower(name)}`;
      }
    }
  }

  const colorClasses = {
    slate: {
      inactive:
        "text-slate-600 bg-slate-50 border-slate-100 hover:border-slate-200 hover:bg-slate-100",
      active: "text-slate-600 border-slate-400 bg-slate-100",
    },
    red: {
      inactive:
        "text-red-600 bg-red-50 border-red-100 hover:border-red-200 hover:bg-red-100",
      active: "text-red-600 border-red-400 bg-red-100",
    },
    orange: {
      inactive:
        "text-orange-600 bg-orange-50 border-orange-100 hover:border-orange-200 hover:bg-orange-100",
      active: "text-orange-600 border-orange-400 bg-orange-100",
    },
    yellow: {
      inactive:
        "text-yellow-600 bg-yellow-50 border-yellow-100 hover:border-yellow-200 hover:bg-yellow-100",
      active: "text-yellow-600 border-yellow-400 bg-yellow-100",
    },
    green: {
      inactive:
        "text-green-600 bg-green-50 border-green-100 hover:border-green-200 hover:bg-green-100",
      active: "text-green-600 border-green-400 bg-green-100",
    },
    blue: {
      inactive:
        "text-blue-600 bg-blue-50 border-blue-100 hover:border-blue-200 hover:bg-blue-100",
      active: "text-blue-600 border-blue-400 bg-blue-100",
    },
    pink: {
      inactive:
        "text-pink-600 bg-pink-50 border-pink-100 hover:border-pink-200 hover:bg-pink-100",
      active: "text-pink-600 border-pink-400 bg-pink-100",
    },
    purple: {
      inactive:
        "text-purple-600 bg-purple-50 border-purple-100 hover:border-purple-200 hover:bg-purple-100",
      active: "text-purple-600 border-purple-400 bg-purple-100",
    },
  };
  const classes = `text-nowrap font-medium px-2 py-1 text-bl rounded-md ease-out duration-300 flex justify-center items-center gap-[0.4rem] ${
    big ? "text-sm border-[1.45px]" : "text-xs border-[1.3px]"
  }  ${colorClasses[color || "slate"][tagIsActive ? "active" : "inactive"]}`;

  const userListIcon =
    name === "Favorites" ? (
      <FaFire />
    ) : name === "Submitted" ? (
      <FaYoutube />
    ) : (
      <FaBookmark />
    );

  return (
    <>
      {!select ? (
        <Link href={pathConstructor()} className={classes}>
          {isUserList && userListIcon}
          {name}
        </Link>
      ) : (
        <TagSelector
          name={name}
          description={description}
          refImage={refImage}
          classes={classes}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      )}
    </>
  );
}
