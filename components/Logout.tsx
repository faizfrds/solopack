"use client";
import { signOut } from "next-auth/react";
import React from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getServerSession } from "next-auth";
import { Session } from "next-auth";


export default function Logout() {
  const router = useRouter();

  const onClick = () => {
    signOut();
    toast.success("Successfully logged out");
    router.refresh();
  };

  return (
    <Button onClick={onClick}>
      Log Out
    </Button>
  );
}
