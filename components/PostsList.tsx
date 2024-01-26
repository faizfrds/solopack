// import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import { JsonValue } from "@prisma/client/runtime/library";
import PostCards from "./PostCards";

type PostType = {
  id: string;
  title: string;
  content: JsonValue;
  createdAt: Date;
  updatedAt: Date;
  locationId: string;
  authorId: string;
};

const PostsList = async ({
  children,
  slug,
}: {
  children?: React.ReactNode;
  slug: string;
}) => {
  //   const session = await getAuthSession();
  //   const [items, setItems] = useState<PostType[]>([]);
  //   const [hasMore, setHasMore] = useState(true);
  //   const [index, setIndex] = useState(5);

  //determines if user is subscribed to this location
  //   const post = async (index: number) = {
  let items: PostType[] = await db.post.findMany({
    where: {
      location: {
        name: slug,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const author = async (authorId: string) => {
    return await db.user.findFirst({
      where: {
        id: authorId,
      },
    });
  };

  //   const fetchItems = async () => {
  //     items = await db.post.findMany({
  //       take: 5,
  //       where: {
  //         location: {
  //           name: slug,
  //         },
  //       },
  //       orderBy: {
  //         createdAt: "asc",
  //       },
  //     });
  //   };

  //   const location = await db.location.findFirst({
  //     where: {
  //       name: slug,
  //     },
  //     include: {
  //       posts: {
  //         include: {
  //           author: true,
  //           votes: true,
  //         },
  //       },
  //     },
  //   });

  //   useEffect(() => {
  //     posts(index);
  //   }, []);

  //   if (!location) return notFound();

  return (
    <div className="flex flex-col w-full gap-y-2">
      {items.map((post) => (
        <PostCards
          title={post.title}
          content={post.content.body || null}
          author={author(post.authorId).then(res => res?.name)}
        />
      ))}

      {/* <div>
        <InfiniteScroll
          dataLength={5}
          next={fetchItems}
          hasMore={items.length > 0} // Replace with a condition based on your data source
          loader={<p>Loading...</p>}
          endMessage={<p>No more data to load.</p>}
        >
          {items.map((post) => (
            <PostCards
              title={post.title}
              content={post.content.body || null}
              author={post.authorId}
            />
          ))}
        </InfiniteScroll>
      </div> */}
    </div>
  );
};

export default PostsList;
