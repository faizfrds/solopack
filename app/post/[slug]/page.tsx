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

interface PostType {
    id: string;
    title: string;
    content: {
      body: string;
    }
    createdAt: Date;
    updatedAt: Date;
    locationId: string;
    authorId: string;
}

const Post = async ({ params }: PostProps) => {
  const { slug } = params;
  const post: PostType | null = await db.post.findFirst({
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
      <div className="md:w-full rounded-md md:p-8 md:mx-0 mx-2 p-2 border-2 border-zinc-200">
        <h1 className="flex md:mb-2 p-0 text-lg text-zinc-800 font-semibold">{post?.title}</h1>
        <div>{post?.content.body}</div>
      </div>
      <ReplyBox postId={post!.id} authorId={session?.user.id} name={session!.user.email} pic={session!.user.image} />
      <h1 className="text-2xl mt-4 mb-2 font-bold text-zinc-400 md:mx-0 mx-2">
        Comments
      </h1>
      <CommentsList slug={params.slug} />
    </div>
  );
};

export default Post;
