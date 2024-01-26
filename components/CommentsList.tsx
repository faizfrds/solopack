// import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import { JsonValue } from "@prisma/client/runtime/library";
import PostCards from "./PostCards";
import CommentCards from "./CommentCards";

type CommentType = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
};

const CommentsList = async ({
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
  let comments: CommentType[] = await db.comment.findMany({
    where: {
      postId: slug,
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

  

  return (
    <div className="flex flex-col w-full gap-y-1">
      {comments.map((com) => (
        <CommentCards
          id={com.id}
          content={com.content}
          author={author(com.authorId).then(res => res?.name)}
          date={com.createdAt.toString()}
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

export default CommentsList;
