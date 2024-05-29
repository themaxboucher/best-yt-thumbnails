"use client";

import { useContext } from "react";
import SignupForm from "./signup-form";
import Modal from "../ui/modal";
import Logo from "../logo";
import { ModalsContext } from "@/store/modals-context";

export default function SignupModal() {
  const useModalsContext = useContext(ModalsContext);

  // FIX: Close the modal when the page changes for when users click to log in (or even if they just change the path)

  return (
    <Modal
      isOpen={useModalsContext.authModalOpen}
      closeModal={useModalsContext.closeAuthModal}
    >
      <Logo />
      <SignupForm />
    </Modal>
  );
}
