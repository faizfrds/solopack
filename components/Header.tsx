"use client";

import { HiSearch } from "react-icons/hi";
import { twMerge } from "tailwind-merge";

interface HeaderProps {
  className?: string;
  isOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ className }) => {

  return (
    <div className="flex justify-center w-screen md:h-[50vh] h-fit bg-cover bg-[url('/images/marquee-pic.png')] items-center md:p-2 py-24">
      <div className="md:w-8/12 w-10/12">
        <div className="flex text-white justify-center lg:text-6xl text-4xl font-bold text-center">
          Find your next fur friend
        </div>
        {/* <div className="lg:flex hidden justify-center">
            <SearchBar />
        </div> */} {/* SEARCH FUNCTIONALITY NOT FUNCTIONAL YET*/}

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
