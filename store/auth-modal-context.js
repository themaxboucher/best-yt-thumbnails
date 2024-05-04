"use client";

import { createContext, useState } from "react";

export const AuthModalContext = createContext({
  authModalOpen: false,
  openAuthModal: () => {},
  closeAuthModal: () => {},
});

export default function AuthModalContextProvider({ children }) {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  function openAuthModalHandler() {
    setAuthModalOpen(true);
  }
  function closeAuthModalHandler() {
    setAuthModalOpen(false);
  }

  const context = {
    authModalOpen: authModalOpen,
    openAuthModal: openAuthModalHandler,
    closeAuthModal: closeAuthModalHandler,
  };

  return (
    <AuthModalContext.Provider value={context}>
      {children}
    </AuthModalContext.Provider>
  );
}
