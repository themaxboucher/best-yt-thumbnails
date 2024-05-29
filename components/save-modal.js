"use client";

import { useState } from "react";
import Modal from "./ui/modal";
import CreateCollectionForm from "./create-collection-form";
import SelectCollectionsForm from "./select-collections-form";

// FIX: Close the modal when the page changes for when users click to log in (or even if they just change the path)
export default function SaveModal({ isOpen, closeModal, thumbnailId }) {
  const [isCreateCollection, setIsCreateCollection] = useState(false);

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="w-[22rem] px-2">
        {!isCreateCollection ? (
          <SelectCollectionsForm
            setIsCreateCollection={setIsCreateCollection}
            thumbnailId={thumbnailId}
            closeModal={closeModal}
          />
        ) : (
          <CreateCollectionForm setIsCreateCollection={setIsCreateCollection} />
        )}
      </div>
    </Modal>
  );
}
