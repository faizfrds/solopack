"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Session } from "next-auth";
import { Input } from "./ui/input";
import Button from "./Button";
import { ImageIcon, Link2 } from "lucide-react";

interface CreatePostInterface {
  session: Session | null;
}
const CreatePost: React.FC<CreatePostInterface> = ({ session }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="shadow flex items-center">
      <div className="flex w-full items-center p-2">
        <Input
          readOnly
          placeholder="Create Post"
          className="p-2 w-[300%]"
        />
        <Button className="m-4">
          <ImageIcon className="text-zinc-600" />
        </Button>
        <Button className="m-4">
          <Link2 className="text-zinc-600" />
        </Button>
      </div>
      <div className="relative">

      </div>
    </div>
  );
};

export default CreatePost;
