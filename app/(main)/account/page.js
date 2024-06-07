import LoadingGrid from "@/components/loading/loading-cards";
import { redirect } from "next/navigation";

export default function AccountPage() {
  redirect("/account/favorites");
  return <LoadingGrid rows={4} />;
}
