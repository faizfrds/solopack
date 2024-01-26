
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import CommentCards from "./CommentCards";

const CommentsList = async ({
  children,
  slug,
}: {
  children?: React.ReactNode;
  slug: string;
}) => {
  const session = await getAuthSession();
  //   const session = await getAuthSession();
  //   const [items, setItems] = useState<PostType[]>([]);
  //   const [hasMore, setHasMore] = useState(true);
  //   const [index, setIndex] = useState(5);

  //determines if user is subscribed to this location
  //   const post = async (index: number) = {
  let comments = await db.comment.findMany({
    where: {
      postId: slug,
    },
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col w-full gap-y-1">
      {comments.length === 0 ? (<p className="md:mx-0 mx-2">
        No comments yet!
      </p>) : (
        <div>
        {comments.map((com) => (
          <CommentCards
            id={com.id}
            content={com.content}
            author={com.author.name}
            authorId={com.author.id}
            date={com.createdAt.toString()}
            owner={session?.user.id === com.authorId}
          />
        ))}
        </div>
      )}
    </div>
  );
};

export default CommentsList;
