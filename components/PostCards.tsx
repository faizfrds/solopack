"use client"

interface PostCardsProps {
  title: string;
  content: string;
  author: Promise<string | null | undefined>;
}

const PostCards: React.FC<PostCardsProps> = ({
  title,
  content,
  author,
}) => {
  return (
    <div className="w-full rounded-md p-8 hover:shadow-md border-2 border-zinc-200">
      <header className="flex justify-between">
        <h1 className="text-3xl">{title}</h1>
        <p >{author}</p>
      </header>
      <div>
        {content}
      </div>
    </div>
  );
};

export default PostCards;
