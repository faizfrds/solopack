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
  const slug = params.slug.replaceAll("%20", " ");
  console.log(slug)
  const location = await db.location.findFirst({
    where: { name: slug},
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

  if(!location) return;

  return (
    <div className="md:mx-0 mx-3">
      <h1 className="font-bold text-3xl md:text-4xl h-14 capitalize">
        {location.name}
        {", " + location?.state?.toUpperCase()}, {location.country}
      </h1>
      {/* show posts in user feed */}
      <h1 className="md:text-lg text-zinc-400 mt-3 capitalize">Posts for {location.name}</h1>
      <PostsList slug={slug}/>
    </div>
  );
};

export default Page;
