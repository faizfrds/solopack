import { HiSearch } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import SearchBar from "./SearchBar";
import Link from "next/link";
import Button from "./Button";
import Navbar from "./Navbar";
import SearchList from "./SearchList";
import useSearch from "@/hooks/useSearch";


interface HeaderProps {
  className?: string;
  isOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ className }) => {

  return (
    <div className="flex flex-col items-center justify-center h-[90vh] md:h-screen bg-fixed bg-center bg-cover bg-[url('/marquee-pic.jpeg')] md:p-2 relative">
      <div className="md:w-8/12 w-10/12 text-center">
        <div className="flex text-white justify-center lg:text-6xl text-4xl font-bold text-center">
          Discover your next experience
        </div>
        <div className="flex justify-center">
            <SearchBar />
        </div> {/* SEARCH FUNCTIONALITY NOT FUNCTIONAL YET*/}
        <p className="text-center text-lg text-white md:font-extrabold font-semibold my-2">
          or
        </p>
      </div>
      <Link href="/create" className="text-center justify-center flex w-fit">
          <Button className="justify-center w-fit">Create Community</Button>
      </Link>
    </div>
  );
};

export default Header;
