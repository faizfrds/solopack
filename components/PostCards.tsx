"use client"

import { useRouter } from "next/navigation";

interface PostCardsProps {
  id: string;
  title: string;
  content: string;
  author: Promise<string | null | undefined>;
}

const PostCards: React.FC<PostCardsProps> = ({
  id,
  title,
  content,
  author,
}) => {

  const router = useRouter();

  return (

    <button className="w-full rounded-md p-8 hover:shadow-md border-2 border-zinc-200" onClick={() => router.push(`/post/${id}/`)}>
      <header className="flex justify-between">
        <h1 className="text-3xl">{title}</h1>
        <p >{author}</p>
      </header>
      <div>
        {content}
      </div>
    </button>
  );
};

export default PostCards;
