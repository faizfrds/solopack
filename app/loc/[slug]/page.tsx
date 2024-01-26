import CreatePost from "@/components/CreatePost";
import PostsList from "@/components/PostsList";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { slug } = params;
  const location = await db.location.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          location: true,
        },

        take: INFINITE_SCROLLING_PAGINATION_RESULTS,
      },
    },
  });

  if (!location) return notFound();

  return (
    <div className="md:mx-0 mx-2">
      <h1 className="font-bold text-3xl md:text-4xl h-14">
        {location.name}
        {", " + location?.state}, {location.country}
      </h1>
      {/* show posts in user feed */}
      <PostsList slug={slug}/>
    </div>
  );
};

export default Page;
