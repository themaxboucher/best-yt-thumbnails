"use client";

import { createContext, useState } from "react";

export const ModalsContext = createContext({
  authModalOpen: false,
  openAuthModal: () => {},
  closeAuthModal: () => {},
  saveModalOpen: false,
  openSaveModal: () => {},
  closeSaveModal: () => {},
  saveModalThumbnail: "",
  setSaveModalThumbnail: () => {},
});

export default function ModalsContextProvider({ children }) {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  function openAuthModalHandler() {
    setAuthModalOpen(true);
  }
  function closeAuthModalHandler() {
    setAuthModalOpen(false);
  }

  const [saveModalOpen, setSaveModalOpen] = useState(false);
  function openSaveModalHandler() {
    setSaveModalOpen(true);
  }
  function closeSaveModalHandler() {
    setSaveModalOpen(false);
  }

  const [saveModalThumbnail, setSaveModalThumbnail] = useState("");

  const context = {
    authModalOpen: authModalOpen,
    openAuthModal: openAuthModalHandler,
    closeAuthModal: closeAuthModalHandler,
    saveModalOpen: saveModalOpen,
    openSaveModal: openSaveModalHandler,
    closeSaveModal: closeSaveModalHandler,
    saveModalThumbnail: saveModalThumbnail,
    setSaveModalThumbnail: setSaveModalThumbnail,
  };

  return (
    <ModalsContext.Provider value={context}>{children}</ModalsContext.Provider>
  );
}
