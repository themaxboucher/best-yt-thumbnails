"use client";

import { useContext } from "react";
import SignupForm from "./signup-form";
import { AuthModalContext } from "@/store/auth-modal-context";
import Modal from "../ui/modal";
import Logo from "../logo";

export default function SignupModal() {
  const useAuthModalContext = useContext(AuthModalContext);

  // FIX: Close the modal when the page changes for when users click to log in (or even if they just change the path)

  return (
    <Modal
      isOpen={useAuthModalContext.authModalOpen}
      closeModal={useAuthModalContext.closeAuthModal}
    >
      <Logo />
      <SignupForm />
    </Modal>
  );
}
