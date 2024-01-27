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
  content: {
    body: string;
  };
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
  let items = await db.post.findMany({
    where: {
      location: {
        name: slug,
      },
    },
    include: {
      author: true,
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

  const session = await getAuthSession() ? true : false;

  return (
    <div className="flex flex-col w-full gap-y-2">
      {(items.length === 0) ? <p className="mt-4 text-center">
        No posts yet. Create one!
      </p> : items.map((post) => (
        <PostCards
          id={post.id}
          title={post.title}
          content={post.content.body}
          author={post.author.name}
          auth={session}
          email={post.author.email}
        />
      ))}
      
    </div>
  );
};

export default PostsList;
