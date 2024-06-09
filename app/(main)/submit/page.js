"use client";

import SectionLarge from "@/components/layout/section-large";
import SubmitForm from "@/components/submit-form";
import { auth } from "@/data/firebase";
import { redirect } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

export default function SubmitPage() {
  const [user, loading] = useAuthState(auth);

  // Block page from non authenticated users
  if (!user && !loading) redirect("/");

  // Only render content if user is authenticated
  if (user)
    return (
      <SectionLarge>
        <SubmitForm userId={user.uid} />
      </SectionLarge>
    );
}
