"use client";

import { auth } from "@/data/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function NoUserContent({ children }) {
  const [user] = useAuthState(auth);
  return <>{!user && <>{children}</>}</>;
}
