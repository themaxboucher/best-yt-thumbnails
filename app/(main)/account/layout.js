"use client";

import AccountHeader from "@/components/account-header";
import SectionLarge from "@/components/layout/section-large";
import TagSlider from "@/components/tag-slider";
import { auth } from "@/data/firebase";
import { userLists } from "@/data/userLists";
import { redirect } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

export default function AccountLayout({ children }) {
  const [user, loading] = useAuthState(auth);

  // Block page from non authenticated users
  if (!user && !loading) redirect("/");

  // Only render content if user is authenticated
  if (user)
    return (
      <SectionLarge>
        <div className="flex flex-col justify-start items-center gap-4 w-full">
          <AccountHeader user={user} />
          <div className="flex justify-between gap-4 w-full">
            <TagSlider tags={userLists} isUserLists />
          </div>
        </div>
        {children}
      </SectionLarge>
    );
}
