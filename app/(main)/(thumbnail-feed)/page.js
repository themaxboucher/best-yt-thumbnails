import LoadingGrid from "@/components/loading/loading-cards";
import { sortFilters } from "@/data/sortFilters";
import slugifyLower from "@/helper-functions/slugifyLower";
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect(`/${slugifyLower(sortFilters[0])}`);
  return <LoadingGrid />;
}
