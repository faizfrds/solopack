"use client";

import { format } from "date-fns";
import { useRouter } from "next/navigation";

interface CommentCardsProps {
  id: string;
  content: string;
  author: Promise<string | null | undefined>;
  date: string;
}

const CommentCards: React.FC<CommentCardsProps> = ({
  id,
  content,
  author,
  date,
}) => {
  const router = useRouter();

  return (
    <div className="w-full p-3 border-zinc-200 border-b flex flex-col">
      <div className="flex justify-between text-zinc-400 text-md">
        <header className="flex justify-between">
          <p>{author}</p>
        </header>
        <p>
          <time dateTime={date}>{format(date, "MMMM d, yyyy")}</time>
        </p>
      </div>
      <div className="text-sm mt-2">{content}</div>
    </div>
  );
};

export default CommentCards;
