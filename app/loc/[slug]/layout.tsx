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

  slug = slug.replaceAll("%20", " ")

  const location = await db.location.findFirst({
    where: {
      name: slug,
    },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  });

  //determines if user is subscribed to this location
  const subscription = !session?.user
    ? undefined
    : await db.subscription.findFirst({
        where: {
          location: {
            name: slug,
          },
          user: {
            id: session.user.id,
          },
        },
      });

  const isSubscribed = !!subscription;

  if (!location) return notFound();

  //   counts number of subscribers
  const memberCount = await db.subscription.count({
    where: {
      location: {
        name: slug,
      },
    },
  });

  return (

    <div className="sm:container max-w-7xl mx-auto h-screen pt-12 mb-3">
      <div>
        <SubmitPageHeader />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 md:py-6 py-1">
          <div className="flex flex-col col-span-2 space-y-6">{children}</div>
          {/* info sidebar */}
          <div className="hidden md:block overflow-hidden h-fit rounded-lg border-gray-200 order-first md:order-last">
            <div className="px-6 py-4">
              <p className="font-semibold py-3 capitalize">About {location.name}</p>
            </div>

            <dl className="divide-y divide-gray-200 px-6 py-4 test-sm leading-6 bg-white">
              <div className="flex justify-between gap-x-4 py-4">
                <dt className="text-gray-500">Community Created</dt>
                <dt className="text-gray-700">
                  <time dateTime={location.createdAt.toDateString()}>
                    {format(location.createdAt, "MMMM d, yyyy")}
                  </time>
                </dt>
              </div>

              <div className="flex justify-between gap-x-4 py-4">
                <dt className="text-gray-500">Members</dt>
                <dt className="text-gray-700">
                  <div>{memberCount}</div>
                </dt>
              </div>

              {location.creatorId === session?.user.id ? (
                <div className="flex justify-between gap-x-4 py-3">
                  <p className="text-gray-400 capitalize text-sm">
                    you created this community
                  </p>
                </div>
              ) : null}

              {location.creatorId !== session?.user.id ? (
                <SubscribeLeaveToggle
                  locationName={location.name}
                  locationId={location.id}
                  isSubscribed={isSubscribed}
                />
              ) : null}

              <Link href={`/loc/${location.name}/submit`}>
                <Button className="w-full rounded-md capitalize mt-3 border border-gray-200">
                  Make a Post
                </Button>
              </Link>
            </dl>
          </div>

          <div className="md:hidden relative overflow-hidden h-fit rounded-lg border-gray-200 order-first bg-zinc-400">
            <dl className="divide-y divide-gray-200 px-3 pt-0 pb-2 text-xs leading-6 bg-white">
              <div className="flex justify-between gap-x-4 py-4">
                <dt className="text-gray-500">Community Created</dt>
                <dt className="text-gray-700">
                  <time dateTime={location.createdAt.toDateString()}>
                    {format(location.createdAt, "MMMM d, yyyy")}
                  </time>
                </dt>
              </div>

              <div className="flex justify-between gap-x-4 py-4">
                <dt className="text-gray-500">Members</dt>
                <dt className="text-gray-700">
                  <div>{memberCount}</div>
                </dt>
              </div>

              {location.creatorId === session?.user.id ? (
                <div className="flex justify-between gap-x-4 py-3">
                  <p className="text-gray-400 capitalize text-sm">
                    you created this community
                  </p>
                </div>
              ) : null}

              {location.creatorId !== session?.user.id ? (
                <SubscribeLeaveToggle
                  locationName={location.name}
                  locationId={location.id}
                  isSubscribed={isSubscribed}
                />
              ) : null}

              <Link href={`/loc/${location.name}/submit`}>
                <Button className="w-full rounded-md capitalize mt-3 border border-gray-200">
                  Make a Post
                </Button>
              </Link>
            </dl>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Layout;
