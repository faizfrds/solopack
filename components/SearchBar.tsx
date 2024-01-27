"use client";

import { HiSearch } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import SearchCard from "./SearchCard";
import { Input } from "./ui/input";

type LocationType = {
  id: string;
  name: string;
  state: string | null;
  country: string;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string | null;
  userId: string | null;
};

const SearchBar = () => {
  const [value, setValue] = useState<string>("");
  const [results, setResults] = useState<LocationType[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [exist, setExists] = useState<boolean>(false);

  const router = useRouter();

  const handleSearch = () => {
    return exist ? router.push(`/loc/${value}`) : router.push(`/create`)
  };
  const handleKeyPress = (event: { key: any }) => {
    if (event.key === "Enter") return handleSearch();
  };

  useEffect(() => {
    if (value !== "") {
      const fetching = async () => {
        setResults((await axios.get(`/api/search?q=${value}`)).data);
      };
      console.log(results);
      fetching();
      setShow(true)

      results.length === 0 ? setExists(false) : setExists(true)
    }
    else{
      setShow(false)
    }
  }, [value]);

  return (
    <div className="flex items-center justify-center pt-5 w-screen">
      <div className="flex flex-col md:w-[50%] items-center">
        <Input
          value={value}
          id="search"
          className="text-black p-4 rounded-full w-full items-center translate-y-2 text-center capitalize"
          type="text"
          required
          placeholder="Search Location"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyPress}
          autoComplete="off"
        />
        <div className="absolute bg-transparent mt-14 md:w-[33%] w-[53%] rounded-md">
          {show ? <div className="flex flex-col w-full bg-white">
              {results.map((res) => (
                res.state ? 
                <SearchCard name={res.name} state={res.state} country={res.country} /> : <SearchCard name={res.name} country={res.country} />
              ))}
            </div> : null}
        </div>
      </div>

      <button
        className="animate flex bg-rose-400 hover:bg-rose-500 items-center ml-2 md:p-4 p-1 text-white font-bold rounded-full mt-5"
        onClick={() => handleSearch()}
      >
        <HiSearch size={20} />
      </button>
    </div>
  );
};

export default SearchBar;
