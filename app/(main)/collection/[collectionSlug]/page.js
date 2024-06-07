import CollectionHeader from "@/components/collection-header";
import CollectionThumbnails from "@/components/collection-thumbnails";
import GridWrapper from "@/components/layout/grid-wrapper";
import LoadingGrid from "@/components/loading/loading-cards";
import Button from "@/components/ui/button";
import ButtonGroup from "@/components/ui/button-group";
import { notFound } from "next/navigation";

export default function CollectionPage({ params }) {
  notFound(); // Hide untily collections feature is ready
  const collection = {};

  return (
    <>
      <CollectionHeader
        name="Collection Name"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        numSaved={4}
      />
      <LoadingGrid rows={2} />
      <CollectionThumbnails saved={[]} />
    </>
  );
}
