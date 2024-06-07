"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import GoogleButton from "./google-button";

export default function SignupForm() {
  return (
    <div className="mx-auto w-full max-w-[17rem] px-4">
      <div>
        <form className="space-y-6">
          <div className="space-y-1">
            <h2 className="heading-4 text-center">Welcome to BYTT</h2>
            <p className="text-sm text-center">
              Create an acount to favorite thumbnails and submit your own.
            </p>
          </div>
          {/*
          <Input type="text" placeholder="Full name" required />
          <Input type="email" placeholder="Email" required />
          <Input type="password" placeholder="Password" required />
          <Button fullWidth>Create account</Button>
          <div className="w-full h-[1px] bg-slate-100"></div>
          */}
          <GoogleButton />

          <div>
            <span className="text-[0.65rem] block text-slate-400 text-center">
              By joining you agree to the{" "}
              <a className="underline">Terms and Conditions</a> and{" "}
              <a className="underline">Privacy Policy</a>
            </span>
          </div>

          {/*
            <Button
              onClick={() => setIsSignup(false)}
              secondary
              fullWidth
              label="Have an account?"
              type="button"
            >
              Log in
            </Button>
          */}
        </form>
      </div>
    </div>
  );
}
