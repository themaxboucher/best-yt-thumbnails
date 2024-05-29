"use client";

import Image from "next/image";
import { FaBookmark, FaFire } from "react-icons/fa6";

import { auth } from "@/data/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { redirect } from "next/navigation";
import SettingsButton from "@/components/settings-button";
import ButtonGroup from "@/components/ui/button-group";

export default function AccountPage() {
  const [user, loading] = useAuthState(auth);

  // Block page from non authenticated users
  if (!user && !loading) redirect("/auth/login");

  // Only render content if user is authenticated
  if (user)
    return (
      <section className="mx-auto w-full max-w-[80rem] px-10 py-16 flex flex-col justify-start items-center gap-8">
        <div className="flex justify-between items-center gap-6 w-full my-10 ">
          <div className="flex justify-center items-center gap-4">
            <div className="size-14 rounded-full shadow-inner relative overflow-hidden">
              <Image
                src={user.photoURL}
                alt={user.displayName}
                fill
                className="absolute inset-0 size-full"
              />
            </div>
            <div>
              <p className="text-slate-900 text-lg font-semibold">
                {user.displayName}
              </p>
              <p className="text-sm">{user.email}</p>
            </div>
          </div>
          <ButtonGroup>
            <SettingsButton />
          </ButtonGroup>
        </div>
        <div className="w-full">
          <div className="flex justify-start items-center gap-2">
            <div className="text-orange-500 font-medium bg-orange-50 border-[1.5px] border-orange-100 hover:border-orange-200 hover:bg-orange-100 text-sm rounded-md text-nowrap px-2 py-1 text-bl ease-out duration-300 w-min flex justify-center items-center gap-1 cursor-pointer">
              <FaFire />
              Favorites
            </div>
            <div className="text-blue-500 font-medium bg-blue-50 border-[1.5px] border-blue-100 hover:border-blue-200 hover:bg-blue-100 text-sm rounded-md text-nowrap px-2 py-1 text-bl ease-out duration-300 w-min flex justify-center items-center gap-1 cursor-pointer">
              <FaBookmark />
              Alex's YouTube
            </div>
            <div className="text-blue-500 font-medium bg-blue-50 border-[1.5px] border-blue-100 hover:border-blue-200 hover:bg-blue-100 text-sm rounded-md text-nowrap px-2 py-1 text-bl ease-out duration-300 w-min flex justify-center items-center gap-1 cursor-pointer">
              <FaBookmark />
              Great Designs
            </div>
          </div>
        </div>
      </section>
    );
}
