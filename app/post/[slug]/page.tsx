import CommentsList from "@/components/CommentsList";
import CreatePost from "@/components/CreatePost";
import PostsList from "@/components/PostsList";
import ReplyBox from "@/components/ReplyBox";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface PostProps {
  params: {
    slug: string;
  };
}

const Post = async ({ params }: PostProps) => {
  const { slug } = params;
  const post = await db.post.findFirst({
    where: { id: slug },
    include: {
      comments: {
        include: {
          author: true,
          votes: true,
          post: true,
        },

        take: INFINITE_SCROLLING_PAGINATION_RESULTS,
      },
    },
  });

  const session = await getAuthSession();

  return (
    <div>
      <div className="w-full rounded-md p-8 border-2 border-zinc-200">
        <h1 className="font-bold text-3xl md:text-4xl h-14">{post?.title}</h1>

        {/* show posts in user feed */}
        <div>{post?.content.body}</div>
      </div>
      <ReplyBox postId={post!.id} authorId={post!.authorId} name={session!.user.email} pic={session!.user.image} />
      <h1 className="text-2xl mt-4 mb-2 font-bold text-zinc-400">
        Comments
      </h1>
      <CommentsList slug={params.slug} />
    </div>
  );
};

export default Post;
