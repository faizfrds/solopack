"use client";

import { twMerge } from "tailwind-merge";
import {
  HiHeart,
  HiMenu,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineX,
  HiArrowSmRight,
  HiHome,
} from "react-icons/hi";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useMemo, useState, useEffect } from "react";
// import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import classNames from "classnames";

import Button from "./Button";
import Header from "./Header";
import useAuthModal from "@/hooks/useAuthModal";
// import { useUser } from "@/hooks/useUser";
import useSidebar from "@/hooks/useSidebar";
import SdBar from "./Sidebar";
import Sidebar from "./Sidebar";

interface NavbarProps {
  className?: string;
  children: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ className, children }) => {
  const router = useRouter();
  const authModal = useAuthModal();
  const sidebarShow = useSidebar();
  //   const navOpen = useNavbar((state) => state.onToggle)

  //   const supabaseClient = useSupabaseClient();
  //   const { user } = useUser();

  const pathname = usePathname();

  const checkPath = () => {
    if (pathname == "/") {
      return <Header />;
    }
  };

  //   const handleLogout = async () => {
  //     const { error } = await supabaseClient.auth.signOut();
  //     router.refresh();

  //     if (error) {
  //       toast.error(error.message);
  //     } else {
  //       sidebarShow.onClose;
  //       router.push("/");
  //       toast.success("Logged Out");
  //     }
  //   };

  //   const checkLogin = () => {
  //     if (!user) {
  //       return authModal.onOpen;
  //     }
  //   };

  //   useEffect(() => {
  //     if (window.innerWidth > 1023) {
  //       if (pathname !== "/") sidebarShow.onClose;
  //       else {
  //         navOpen();
  //       }
  //     }
  //   }, []);

  return (
    <>
      <div className="flex justify-center stick bg-emerald-400 text-center">
        <div className="flex justify-between text-center items-center w-full mx-12 p-3 text-white">
          {sidebarShow.isOpen ? (
                <div
                className={classNames({
                  // 👇 use grid layout
                  "grid min-h-screen": true,
                  // 👇 toggle the width of the sidebar depending on the state
                  "grid-cols-sidebar": !sidebarShow.isOpen,
                  "grid-cols-sidebar-collapsed": sidebarShow.isOpen,
                  // 👇 transition animation classes
                  "transition-[grid-template-columns] duration-300 ease-in-out": true,
                })}
              >
              <Sidebar />
            </div>
          ) : (
            <></>
          )}
          <div>
            <button onClick={sidebarShow.onToggle}>
              <HiMenu size={20} className="text-white" />
            </button>
          </div>
          <div>Solopack</div>

          <div>
            <Button onClick={authModal.onOpen}>Login</Button>
          </div>
        </div>
      </div>

      {children}
    </>
  );
};

export default Navbar;
