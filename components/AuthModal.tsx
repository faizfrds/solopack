"use client";

import Modal from "./Modal";
import useAuthModal from "@/hooks/useAuthModal";
import UserAuthForm from "./UserAuthForm";
import Button from "./Button";
import { useLayoutEffect } from "react";

const AuthModal = () => {
  const { onClose, isOpen} = useAuthModal();
  const useAuth = useAuthModal();

  const onChange = (open: boolean) => {
    if(!open){
        onClose();
    }
  }


  return (
    <div>
      <Modal
        title="Login"
        isOpen={isOpen}
        onChange={onChange}
      >
        <div className="p-5">
        <UserAuthForm />
        
        </div>
      </Modal>
    </div>
  );
};

export default AuthModal;