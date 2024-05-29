"use client";

import updateStatistic from "@/actions/updateStatistic";
import { useState } from "react";
import { HiCheck } from "react-icons/hi";
import CollectionCover from "./collection-cover";

export default function CollectionSelectCard({
  thumbnailId,
  collection,
  userId,
}) {
  const [isSelected, setIsSelected] = useState(
    collection.saved.includes(thumbnailId)
  );
  const [numSaved, setNumSaved] = useState(collection.numSaved);
  const [isDisabled, setIsDisabled] = useState(false);

  // Toggle UI states for collection selection
  function toggleUIStates() {
    setNumSaved((prev) => prev + (isSelected ? -1 : 1));
    setIsSelected((prev) => !prev);
  }

  // Handle collection click
  async function onClickHandler() {
    setIsDisabled(true); // Disable collection card
    toggleUIStates(); // Optimistically update states
    try {
      const statisticData = {
        type: "save",
        userId: userId,
        collectionId: collection.id,
        thumbnailId: thumbnailId,
        remove: isSelected,
      };
      await updateStatistic(statisticData);

      setIsDisabled(false); // Re-enable collection card
    } catch (error) {
      console.log(error);
      toggleUIStates(); // Revert the state changes if the request fails

      // Show user an error message if the request fails
      const alertMessage = isSelected
        ? "An error occured while attempting to remove this thumbnail. Please try again later."
        : "An error occured while attempting to add this thumbnail. Please try again later.";
      alert(alertMessage);
    }
  }
  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClickHandler}
      className={`p-[0.6rem] border-2 ease-out duration-300 cursor-pointer rounded-lg flex justify-between items-center gap-6 w-full ${
        isSelected
          ? "border-slate-300"
          : "border-slate-100 hover:border-slate-200"
      }`}
    >
      <div className="flex justify-between items-center gap-4">
        <CollectionCover collectionSaved={collection.saved} />
        <div className="text-left">
          <h3 className="font-medium text-sm max w-36 truncate">
            {collection.name}
          </h3>
          <p className="text-xs">{numSaved} thumbnails</p>
        </div>
      </div>
      {isSelected && (
        <span className="text-slate-900 pr-3">
          <HiCheck className="size-5" aria-hidden="true" />
        </span>
      )}
    </button>
  );
}
