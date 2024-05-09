"use client";

import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { FaBookmark, FaFire, FaYoutube } from "react-icons/fa6";
import Button from "./ui/button";
import { auth } from "@/data/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import getFirstLetter from "@/helper-functions/getFirstLetter";
import ButtonGroup from "./ui/button-group";
import ThemeSelect from "./theme-select";

export default function NavMenu() {
  const [user] = useAuthState(auth);

  return (
    <>
      {user ? (
        <Menu as="div" className="relative">
          <Menu.Button className="cursor-pointer size-8 rounded-full relative overflow-hidden bg-slate-100">
            {user.photoURL ? (
              <Image src={user.photoURL} alt={user.displayName} fill />
            ) : (
              <div className="text-slate-500 text-sm font-semibold">
                {getFirstLetter(user.displayName)}
              </div>
            )}
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
            <Menu.Items className="absolute z-20 right-0 mt-2 w-52 origin-top-right rounded-lg bg-white shadow-lg flex flex-col justify-start items-stretch text-sm font-medium divide-y divide-slate-100 ring-1 ring-slate-100 focus:outline-none">
              <div href="/account" className="p-4">
                <p className="text-sm text-slate-950 font-medium truncate">
                  {user.displayName}
                </p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>
              <div className="p-2 flex flex-col text-slate-800">
                <Menu.Item className="p-2 rounded-lg">
                  {({ active }) => (
                    <Link
                      className={`${
                        active && "bg-slate-50"
                      } flex gap-2 items-center`}
                      href="/account"
                    >
                      <FaFire className="size-3" />
                      <span>Favorites</span>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item className="p-2 rounded-lg">
                  {({ active }) => (
                    <Link
                      className={`${
                        active && "bg-slate-50"
                      } flex gap-2 items-center`}
                      href="/account"
                    >
                      <FaBookmark className="size-3" />
                      <span>Collections</span>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item className="p-2 rounded-lg">
                  {({ active }) => (
                    <Link
                      className={`${
                        active && "bg-slate-50"
                      } flex gap-2 items-center`}
                      href="/submit"
                    >
                      <FaYoutube className="size-[0.8rem]" />
                      <span>Submit</span>
                    </Link>
                  )}
                </Menu.Item>
              </div>
              <ThemeSelect />
              <div className="p-2 flex flex-col text-slate-500">
                <Menu.Item className="p-2 rounded-lg">
                  {({ active }) => (
                    <Link
                      className={`${active && "bg-slate-50"}`}
                      href="/account"
                    >
                      Settings
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item className="p-2 rounded-lg">
                  {({ active }) => (
                    <a
                      className={`${active && "bg-slate-50"}`}
                      href="/account-settings"
                    >
                      Log out
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      ) : (
        <>
          <div className="hidden lg:block">
            <ButtonGroup>
              <Button path="/auth/login" secondary>
                Log in
              </Button>
              <Button path="/auth/join">Sign up</Button>
            </ButtonGroup>
          </div>
          <div className="lg:hidden">
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
                <Menu.Items className="absolute z-20 right-0 mt-2 w-52 origin-top-right rounded-lg bg-white shadow-lg flex flex-col justify-start items-stretch text-sm font-medium divide-y divide-slate-100 ring-1 ring-slate-100 focus:outline-none">
                  <div className="p-4 space-y-2">
                    <Button path="/auth/join">Sign up</Button>
                    <Button path="/auth/login" secondary>
                      Log in
                    </Button>
                  </div>
                  <ThemeSelect />
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </>
      )}
    </>
  );
}
