"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface SearchCardProps {
  name: string;
  state?: string;
  country: string;
}

const SearchCard: React.FC<SearchCardProps> = ({ name, state, country }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRedirected, setIsRedirected] = useState<boolean>(false);

  const handleClick = () => {
    setIsLoading(true);
    router.push(`loc/${name}`)
  };

  useEffect(() => {
    if (isRedirected) {
      // Assuming your redirection is complete, set isLoading to false
      setIsLoading(false);
    }

    if (isLoading) toast.loading("Redirecting")

  }, [isRedirected, isLoading]);

  // If you have a different way to detect the completion of the redirection,
  // you may need to adjust the useEffect accordingly.

  return (
    <button onClick={handleClick} disabled={isLoading}>
      <div className="w-full p-2 hover:bg-zinc-200 bg-white border-2 border-zinc-200">
        {isLoading ? "Redirecting..." : state ? `${name}, ${state}, ${country}` : `${name}, ${country}`}
      </div>
    </button>
  );
};

export default SearchCard;