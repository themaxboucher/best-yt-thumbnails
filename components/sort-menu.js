// Headless UI docs: https://headlessui.com/react/listbox

"use client";

import { Fragment, useState } from "react";
import { Listbox, Menu, Transition } from "@headlessui/react";
import { IoChevronDown } from "react-icons/io5";
import { HiCheck } from "react-icons/hi";
import { sortFilters } from "@/data/sortFilters";
import Link from "next/link";
import { usePathname } from "next/navigation";
import slugifyLower from "@/helper-functions/slugifyLower";
import breakdownSlug from "@/helper-functions/breakdownSlug";

// Turn into menu for proper navigation
export default function SortMenu() {
  const menuSortFilters = sortFilters.map((sortFilter) => ({
    name: sortFilter,
  }));
  const pathname = usePathname();

  // Get current sort filter from the current path
  const slugParts = breakdownSlug(pathname);
  const currentSortFilter = slugParts[0];

  // Get current sort filter name (not slugified)
  const currentSortFilterName = sortFilters.find(
    (sortFilter) => slugifyLower(sortFilter) === currentSortFilter
  );

  // Create the link paths based on the current path
  function pathConstructor(filterName) {
    if (slugParts.length === 1) {
      return `/${slugifyLower(filterName)}`;
    } else {
      return `/${slugifyLower(filterName)}/${slugParts[1]}`;
    }
  }

  // Check if the menu item is selected
  function menuItemIsSelected(itemFilterName) {
    return itemFilterName === currentSortFilterName;
  }

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="relative w-full rounded-lg bg-white py-[0.3rem] pl-3 pr-9 text-left text-sm text-slate-900 font-medium border border-slate-100 hover:border-slate-200 ease-out duration-300">
        <span className="block truncate">{currentSortFilterName}</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <IoChevronDown className="size-4 text-slate-950" aria-hidden="true" />
        </span>
      </Menu.Button>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Menu.Items className="absolute z-20 mt-2 max-h-60 w-min rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-slate-100 focus:outline-none sm:text-sm flex flex-col justify-start items-stretch">
          {menuSortFilters.map((filter, filterIdx) => (
            <Menu.Item
              key={filterIdx}
              className="relative select-none py-2 pl-4 pr-10 text-slate-700"
              value={filter}
            >
              {({ active }) => (
                <Link
                  href={pathConstructor(filter.name)}
                  className={`${active && "bg-slate-50"}`}
                >
                  <span
                    className={`block truncate ${
                      menuItemIsSelected(filter.name)
                        ? "font-medium"
                        : "font-normal"
                    }`}
                  >
                    {filter.name}
                  </span>
                  {menuItemIsSelected(filter.name) ? (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-900">
                      <HiCheck className="size-4" aria-hidden="true" />
                    </span>
                  ) : null}
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
