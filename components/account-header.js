import Image from "next/image";
import SettingsButton from "./settings-button";
import ButtonGroup from "./ui/button-group";

export default function AccountHeader({ user }) {
  return (
    <div className="flex justify-between items-center gap-6 w-full my-10 ">
      <div className="flex justify-center items-center gap-4">
        <div className="size-16 rounded-full shadow-inner relative overflow-hidden border-2 border-slate-100">
          <Image
            src={user.photoURL}
            alt={user.displayName}
            fill
            className="absolute inset-0 size-full"
          />
        </div>
        <div>
          <p className="text-slate-900 text-lg font-semibold">
            {user.displayName}
          </p>
          <p className="text-sm">{user.email}</p>
        </div>
      </div>
      <ButtonGroup>
        <SettingsButton />
      </ButtonGroup>
    </div>
  );
}
