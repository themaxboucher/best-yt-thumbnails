"use client";

import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, useContext } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { FaBookmark, FaFire, FaYoutube } from "react-icons/fa6";
import Button from "./ui/button";
import { auth } from "@/data/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import getFirstLetter from "@/helper-functions/getFirstLetter";
import ButtonGroup from "./ui/button-group";
import ThemeSelect from "./theme-select";
import logOut from "@/actions/logOut";
import GoogleButton from "./auth/google-button";
import { ModalsContext } from "@/store/modals-context";

export default function NavMenu() {
  const [user] = useAuthState(auth);
  const useModalsContext = useContext(ModalsContext);

  return (
    <>
      {user ? (
        <div className="flex justify-center items-center gap-5">
          <Button path="/submit">Submit</Button>
          <Menu as="div" className="relative">
            <Menu.Button className="cursor-pointer size-9 rounded-full relative overflow-hidden bg-slate-100 hover:opacity-90 ease-out duration-300">
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
                <Menu.Item className="p-2 rounded-lg">
                  {({ active }) => (
                    <Link
                      href="/account"
                      className={`${active && "bg-slate-50"}`}
                    >
                      <div className="p-2">
                        <p className="text-sm text-slate-950 font-medium truncate">
                          {user.displayName}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {user.email}
                        </p>
                      </div>
                    </Link>
                  )}
                </Menu.Item>
                {/* Hide until theme select feature is created
                <ThemeSelect />
                */}
                <div className="p-2 flex flex-col text-slate-500">
                  {/* Hide link untill settings page is created
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
                  */}
                  <Menu.Item className="p-2 rounded-lg">
                    {({ active }) => (
                      <a
                        className={`${active && "bg-slate-50"} cursor-pointer`}
                        onClick={() => logOut()}
                      >
                        Log out
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      ) : (
        <>
          <div className="hidden lg:block">
            <ButtonGroup>
              <Button onClick={useModalsContext.openAuthModal} secondary>
                Log in
              </Button>
              <Button onClick={useModalsContext.openAuthModal}>Sign up</Button>
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
                    <Button onClick={useModalsContext.openAuthModal}>
                      Sign up
                    </Button>
                    <Button onClick={useModalsContext.openAuthModal} secondary>
                      Log in
                    </Button>
                  </div>
                  {/* Hide until theme select feature is created
                  <ThemeSelect />
                  */}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </>
      )}
    </>
  );
}
