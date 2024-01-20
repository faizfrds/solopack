import AuthModal from "@/components/AuthModal";
import Button from "@/components/Button";
import Header from "@/components/Header";
import { HomeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  

  return (
    <div className="relative">
      <div className="h-[90vh]">
        <Header />
        {/* {Feed} */}
        {/* Subreddit info */}
        {/* <div className="overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
          <div className="bg-emerald-600 px-6 py-4">
            <p className="font-semibold py-3 flex items-center gap-1.5">
              <HomeIcon />
              Home
            </p>
          </div>
        </div> */}

      </div>
    </div>
  );
}
