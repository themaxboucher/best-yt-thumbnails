"use client";

import SubmitForm from "@/components/submit-form";
import { auth } from "@/data/firebase";
import { redirect } from "next/dist/server/api-utils";
import { useAuthState } from "react-firebase-hooks/auth";

export default function SubmitPage() {
  const [user, loading] = useAuthState(auth);

  // Block page from non authenticated users
  if (!user && !loading) redirect("/auth/login");

  // Only render content if user is authenticated
  if (user) return <SubmitForm userId={user.uid} />;
}
