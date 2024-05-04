import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Link from "next/link";
import GoogleButton from "./google-button";

export default function LoginForm() {
  return (
    <div className="mx-auto w-full max-w-[17rem] px-4">
      <div>
        <form className="space-y-3">
          <Input type="email" placeholder="Email" required />
          <Input type="password" placeholder="Password" required />
          <Button fullWidth>Log in</Button>
          <Link
            href="/auth/forgot-password"
            className="text-xs block text-slate-400 text-center hover:text-slate-500 ease-out duration-300 cursor-pointer"
          >
            Forgot password?
          </Link>
          <div className="w-full h-[1px] bg-slate-100"></div>
          <GoogleButton />
          <div className="w-full h-2"></div>
          <Button path="/auth/join" secondary fullWidth label="New to BYTT?">
            Sign up
          </Button>
        </form>
      </div>
    </div>
  );
}
