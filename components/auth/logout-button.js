import Button from "../ui/button";
import { TbLogout2 } from "react-icons/tb";
import { auth } from "@/data/firebase";
import { signOut } from "firebase/auth";

export default function LogoutButton() {
  const logout = async () => {
    const logoutConfirm = confirm("Are you sure you want to logout?");
    if (logoutConfirm == true) {
      await signOut(auth);
    }
  };
  return (
    <Button onClick={logout} secondary>
      Log out
      <TbLogout2 />
    </Button>
  );
}
