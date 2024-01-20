"use client";

import { HiSearch } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


const SearchBar = () => {

    const router = useRouter();
    const [value, setValue]= useState<string>("");


    return ( 
        <div className="flex items-center justify-center pt-5 w-screen">
        <input
          id="search"
          className="text-black p-4 rounded-full md:w-1/3 w-full items-center translate-y-2 text-center"
          type="text"
          required
          placeholder="Search Location"
        />

        <button
          className="hidden animate md:flex bg-rose-400 hover:bg-rose-500 items-center ml-2 p-4 text-white font-bold rounded-full mt-5"
          onClick={() => {}}
        >
          <HiSearch size={25} />
        </button>
      </div>
     );
}
 
export default SearchBar;