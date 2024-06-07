"use client";

import Button from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { auth } from "@/data/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function GoogleButton() {
  // Sign in with google
  const googleProvider = new GoogleAuthProvider();
  const googleLoginHandler = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button onClick={googleLoginHandler} type="button" fullWidth>
      <FcGoogle className="size-[1.1rem]" />
      <span>Continue with Google</span>
    </Button>
  );
}
