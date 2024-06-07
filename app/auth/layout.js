"use client";

import Logo from "@/components/logo";
import { auth } from "@/data/firebase";
import { notFound, redirect } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

export default function AuthLayout({ children }) {
  notFound(); // Hide until fully developed
  const [user, loading] = useAuthState(auth);

  // Block page from authenticated users
  if (user) redirect("/");

  // Only render content if user is not authenticated
  if (!user)
    return (
      <main>
        <div className="flex min-h-screen flex-col justify-between py-8">
          <div className="mb-8 flex justify-center">
            <Logo />
          </div>
          {children}
          <div>Public Beta</div>
        </div>
      </main>
    );
}
