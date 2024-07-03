"use client";

import updateStatistic from "@/actions/updateStatistic";
import { auth } from "@/data/firebase";
import abbreviateNumber from "@/helper-functions/abbreviateNumber";
import { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaBookmark, FaFire } from "react-icons/fa6";
import SaveModal from "./save-modal";
import { ModalsContext } from "@/store/modals-context";
import readThumbnailDoc from "@/actions/readThumbnailDoc";

// Disable while auth is loading
// FIX: favorite interaction
export default function ThumbnailInteraction({
  thumbnailId,
  type,
  number,
  savedBy,
  favoritedBy,
  big,
}) {
  const useModalsContext = useContext(ModalsContext);
  const [user, loading] = useAuthState(auth);
  const [isActive, setIsActive] = useState(null);
  const [statNum, setStatNum] = useState(number);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const isFavorite = type === "favorite";
  const isSave = type === "save";

  async function updateSaveUI() {
    const newThumbData = await readThumbnailDoc(thumbnailId);
    setIsActive(newThumbData.meta.savedBy.includes(user.uid));
    setStatNum(newThumbData.meta.savedBy.length);
  }

  function closeSaveModal() {
    setSaveModalOpen(false);
    updateSaveUI();
  }

  // Determine if the interaction has already been interacted with by the user on load
  useEffect(() => {
    if (!loading) {
      const initiallyActive =
        user &&
        (favoritedBy || savedBy) &&
        ((isFavorite && favoritedBy.includes(user.uid)) ||
          (isSave && savedBy.includes(user.uid)));
      setIsActive(initiallyActive);
    }
  }, [user, favoritedBy, isFavorite, isSave, loading, savedBy]);

  // Optimistically reflect interaction in the UI
  function toggleFavoriteUI() {
    let newIsActive; // Ensure that active state is up to date for incrementing statNum
    setIsActive((prevIsActive) => {
      newIsActive = !prevIsActive;
      return newIsActive;
    });
    setStatNum((prevStatNum) => prevStatNum + (newIsActive ? 1 : -1));
  }

  async function interact() {
    if (isFavorite) {
      toggleFavoriteUI(); // Optimistically update state
      try {
        await updateStatistic({
          type: "favorite",
          userId: user.uid,
          thumbnailId: thumbnailId,
          remove: isActive,
        });
      } catch (error) {
        toggleFavoriteUI(); // Revert the state changes if the request fails

        // Show user error message if the request fails
        const alertMessage = isActive
          ? "An error occured when attempting to unfavorite this thumbnail. Please try again later."
          : "An error occured when attempting to favorite this thumbnail. Please try again later.";
        alert(alertMessage);
        console.log(error);
      }
    } else if (isSave) {
      // Open modal to save thumbnail to specific collection
      setSaveModalOpen(true);
    }
  }

  function onClickHandler() {
    if (user) {
      interact();
    } else {
      useModalsContext.openAuthModal();
    }
  }

  const classes = ` ${
    big && "bg-white p-2 border-[1.5px] border-slate-100 rounded-full"
  } ${
    isActive
      ? isFavorite
        ? "text-orange-500"
        : "text-slate-600"
      : "hover:text-slate-500"
  } active:scale-110 ease-out duration-300 cursor-pointer`;

  return (
    <>
      <div
        className="flex justify-end items-center gap-1 text-slate-400 text-xs"
        title={isFavorite ? "Favorite thumbnail" : "Save thumbnail"}
      >
        <button onClick={onClickHandler} className={classes} disabled={loading}>
          {isSave && <FaBookmark className="size-[0.95rem]" />}
          {isFavorite && <FaFire className="size-[0.95rem]" />}
        </button>
        {!big && statNum >= 0 && (
          <div className="text-slate-700 font-medium ">
            {abbreviateNumber(statNum)}
          </div>
        )}
      </div>
      {isSave && (
        <SaveModal
          isOpen={saveModalOpen}
          closeModal={closeSaveModal}
          thumbnailId={thumbnailId}
        />
      )}
    </>
  );
}
