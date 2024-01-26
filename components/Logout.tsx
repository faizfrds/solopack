"use client";
import { signOut } from "next-auth/react";
import React from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IoMdExit } from "react-icons/io";



export default function Logout() {
  const router = useRouter();

  const onClick = () => {
    signOut();
    toast.success("Successfully logged out");
    router.refresh();
  };

  return (
    <Button onClick={onClick} className="md:bg-zinc-200 bg-transparent md:p-2 py-2 px-0">
      <IoMdExit className="md:hidden flex" size={25}/>
      <p className="hidden md:flex">
      Log Out
      </p>
    </Button>
  );
}
