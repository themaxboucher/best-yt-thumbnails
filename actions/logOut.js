"use client";

import { auth } from "@/data/firebase";
import { signOut } from "firebase/auth";

export default async function logOut() {
  await signOut(auth);
}
