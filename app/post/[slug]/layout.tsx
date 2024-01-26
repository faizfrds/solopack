import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";
import { format } from "date-fns";
import { Divide } from "lucide-react";
import SubscribeLeaveToggle from "@/components/SubscribeLeaveToggle";
import Link from "next/link";
import Button from "@/components/Button";
import SubmitPageHeader from "@/components/SubmitPageHeader";

const Layout = async ({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  const session = await getAuthSession();

  const post = await db.post.findFirst({
    where: {
      id: slug,
    },
    include: {
      author: true,
    },
  });

  //determines if user is subscribed to this post
  // const subscription = !session?.user
  //   ? undefined
  //   : await db.subscription.findFirst({
  //       where: {
  //         location: {
  //           name: slug,
  //         },
  //         user: {
  //           id: session.user.id,
  //         },
  //       },
  //     });

  // const isSubscribed = !!subscription;

  if (!post) return notFound();

  //   counts number of subscribers
  const memberCount = await db.subscription.count({
    where: {
      location: {
        name: slug,
      },
    },
  });

  return (
    <div className="sm:container max-w-7xl mx-auto h-full pt-12">
      <div>
        <SubmitPageHeader />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
          <div className="flex flex-col col-span-2 space-y-6">{children}</div>
          {/* info sidebar */}
          <div className="hidden md:block overflow-hidden h-fit rounded-lg border-gray-200 order-first md:order-last">
            <div className="px-6 py-4 flex justify-between">
              <p className="font-semibold py-3">About {post.author.name}</p>
              <img className="rounded-full" src={post.author.image || undefined} />
            </div>

            <dl className="divide-y divide-gray-200 px-6 py-4 test-sm leading-6 bg-white">
              <div className="flex justify-between gap-x-4 py-4">
                <dt className="text-gray-500">Post Created</dt>
                <dt className="text-gray-700">
                  <time dateTime={post.createdAt.toDateString()}>
                    {format(post.createdAt, "MMMM d, yyyy")}
                  </time>
                </dt>
              </div>

              <div className="flex justify-between gap-x-4 py-4">
                <dt className="text-gray-500">Contact:</dt>
                <dt className="text-gray-700">
                  <div>{post.author.email}</div>
                </dt>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
