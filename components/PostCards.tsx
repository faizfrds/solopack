"use client";

import { useRouter } from "next/navigation";
import AuthModal from "./AuthModal";
import useAuthModal from "@/hooks/useAuthModal";
import { Session } from "@prisma/client";

interface PostCardsProps {
  id: string;
  title: string;
  content: string;
  auth: boolean;
  author: string;
  email: string | null;
}

const PostCards: React.FC<PostCardsProps> = ({
  id,
  title,
  content,
  auth,
  author,
  email,
}) => {
  const router = useRouter();
  const authModal = useAuthModal();

  const handleClick = () => {
    auth ? router.push(`/post/${id}/`) : authModal.onOpen();
  };

  return (
    <button
      className="w-full rounded-md md:p-8 p-2 hover:shadow-md border-2 border-zinc-200"
      onClick={handleClick}
    >
      <p className="flex md:text-sm md:mb-2 p-0  text-xs text-zinc-500">{author} | {email}</p>
      <header className="flex md:justify-between justify-start">
        <h1 className="md:text-3xl text-sm font-semibold justify-start">
          {title}
        </h1>
      </header>
      <div className="md:text-lg text-xs text-left">{content}</div>
    </button>
  );
};

export default PostCards;
