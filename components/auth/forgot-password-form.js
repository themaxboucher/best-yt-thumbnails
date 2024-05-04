import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

export default function ForgotPasswordForm() {
  return (
    <div className="mx-auto w-full max-w-[17rem] px-4">
      <div>
        <form className="space-y-3">
          <Input type="email" placeholder="Email" required />
          <Button fullWidth>Reset password</Button>
          <Button path="/auth/login" secondary fullWidth label="Go back">
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
}
