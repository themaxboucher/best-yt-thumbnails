"use client";

import { auth } from "@/data/firebase";
import { signOut } from "firebase/auth";

export default async function logOut() {
  const logoutConfirm = confirm("Are you sure you want to logout?");
  if (logoutConfirm == true) {
    await signOut(auth);
  }
}
