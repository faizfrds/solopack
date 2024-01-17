"use client";

import AuthModal from "@/components/AuthModal";
import Modal from "@/components/Modal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    //prevents rendering modal in server side
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
    </>
  );
};

export default ModalProvider;
