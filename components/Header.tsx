"use client";

import { HiSearch } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import SearchBar from "./SearchBar";
import Link from "next/link";
import Button from "./Button";
import Navbar from "./Navbar";

interface HeaderProps {
  className?: string;
  isOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ className }) => {

  return (
    <div className="flex items-center justify-center h-screen bg-fixed bg-center bg-cover bg-[url('/marquee-pic.jpeg')] md:p-2 relative">
      <div className="md:w-8/12 w-10/12 text-center">
        <div className="flex text-white justify-center lg:text-6xl text-4xl font-bold text-center">
          Discover your next experience
        </div>
        <div className="lg:flex hidden justify-center">
            <SearchBar />
        </div> {/* SEARCH FUNCTIONALITY NOT FUNCTIONAL YET*/}
        <p className="text-center text-lg text-white font-extrabold">
          or
        </p>
        <Link href="/create">
          <Button className="justify-center w-fit">Create Community</Button>
        </Link>

        {/* <div className="flex lg:hidden">
            
          {!isOpen ? (
            <SearchBar />
          ) : (
            <></>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Header;
