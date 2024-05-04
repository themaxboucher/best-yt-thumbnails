"use client";

import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
import { HiMenuAlt4 } from "react-icons/hi";

export default function NavMenu() {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="cursor-pointer p-[0.3rem] bg-white rounded-lg hover:bg-slate-100 ease-out duration-300 flex justify-center items-center">
        <HiMenuAlt4 className="size-[1.2rem]" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-20 right-0 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg flex flex-col justify-start items-stretch text-sm font-medium ring-1 ring-slate-100 focus:outline-none">
          <div className="border-b border-slate-100 px-4 py-2">
            <span>Light</span>
            <span>Dark</span>
            <span>System</span>
          </div>
          <Menu.Item className="px-4 py-2 rounded-lg">
            {({ active }) => (
              <a
                className={`${active && "bg-slate-50"}`}
                href="/account"
              >
                Account Settings
              </a>
            )}
          </Menu.Item>
          <Menu.Item className="px-4 py-2 rounded-lg">
            {({ active }) => (
              <a
                className={`${active && "bg-slate-50"}`}
                href="/account-settings"
              >
                Log out
              </a>
            )}
          </Menu.Item>
          <div className="border-t border-slate-100 px-4 py-2 flex justify-start items-center gap-4 text-xs text-slate-500 font-normal">
            <Link href="/submit">Submit</Link>
            <Link href="/submit">Submit</Link>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
