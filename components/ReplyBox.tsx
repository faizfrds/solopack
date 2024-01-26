"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaLocationArrow } from "react-icons/fa6";

import useAuthModal from "@/hooks/useAuthModal";
import Button from "./Button";
import { Input } from "./ui/input";

import {
  CommentCreationPayload,
  CommentingValidatorPayload,
} from "@/lib/validator/comment";

interface ReplyBoxProps {
  postId: string;
  authorId: string;
  name: string;
  pic: string;
}

const ReplyBox: React.FC<ReplyBoxProps> = ({ postId, authorId, name, pic }) => {
  const [content, setContent] = useState<string>("");

  const router = useRouter();
  const authModal = useAuthModal();

  const { mutate: createPost, isPending } = useMutation({
    mutationFn: async () => {
      const payload: CommentCreationPayload = {
        content,
        postId,
        authorId,
      };
      const { data } = await axios.post("/api/comments/upload", payload);
      return data as string;
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast.error(
            "That location already exists, please choose a different location"
          );
        } else if (err.response?.status === 422) {
          return toast.error("Invalid post");
        } else if (err.response?.status === 401) {
          authModal.onOpen();
          return toast.error("Login to continue");
        } else if (err.response?.status === 500) {
          return toast.error("Error, try again");
        }
      }
    },

    onSuccess: () => {
      setContent("");
      toast.success("Successfully created comment");
    },
  });

  const handleSubmit = async () => {
    await createPost();
  };

  return (
    <div className="w-full mt-2 bg-zince-50 rounded-md items-center">
      {/* <div className="w-full h-fit flex items-center mb-3 gap-x-2">
        <img className="rounded-full h-5 w-5" src={pic} />
        <p>{name}</p>
      </div> */}
      <div className="w-full">
        <div className="prose prose-stone dark:prose-invert flex gap-y-4 relative items-center">
          <Input
            value={content}
            placeholder="Add a comment"
            className="border-none resize-none appearance-none overflow-hidden bg-transparent text-sm focus:outline-none bg-zinc-100"
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            type="submit"
            onClick={() => {
              handleSubmit();
            }}
            isLoading={isPending}
            className="w-[5%] text-right h-fit bg-transparent hover:bg-transparent hover:scale-110"
          >
            <FaLocationArrow
              size={20}
              onClick={() => {
                handleSubmit();
              }}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReplyBox;
