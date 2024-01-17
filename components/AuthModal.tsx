"use client";

import Modal from "./Modal";
import useAuthModal from "@/hooks/useAuthModal";

// import {
//   useSupabaseClient,
//   useSessionContext,
// } from "@supabase/auth-helpers-react";
// import { useRouter } from "next/navigation";
// import { Auth } from "@supabase/auth-ui-react";
// import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";
import UserAuthForm from "./UserAuthForm";

const AuthModal = () => {
  // const supabaseClient = useSupabaseClient();
  // const router = useRouter();
  // const { session } = useSessionContext();
  const { onClose, isOpen} = useAuthModal();

  // useEffect(() => {
  //   if (session){
  //       router.refresh;
  //       onClose();
  //   }
  // }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if(!open){
        onClose();
    }
  }


  return (
    <Modal
      title="Login"
      isOpen={isOpen}
      onChange={onChange}
    >
      <div className="p-5">
      <UserAuthForm />
      
      </div>
    </Modal>
  );
};

export default AuthModal;