"use client";

import AccountHeader from "@/components/account-header";
import FilterBar from "@/components/filter-bar";
import SectionLarge from "@/components/layout/section-large";
import TagSlider from "@/components/tag-slider";
import { auth } from "@/data/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function AccountLayout({ children }) {
  const [user, loading] = useAuthState(auth);

  // Block page from non authenticated users
  if (!user && !loading) redirect("/auth/login");

  // Only render content if user is authenticated
  if (user)
    return (
      <SectionLarge>
        <div className="flex flex-col justify-start items-center gap-4 w-full">
          <AccountHeader user={user} />
          <div className="flex justify-between gap-4 w-full">
            <TagSlider />
          </div>
        </div>
        {children}
      </SectionLarge>
    );
}
