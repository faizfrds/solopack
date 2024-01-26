"use client";

import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { PostCreationPayload, PostValidator } from "@/lib/validator/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getAuthSession } from "@/lib/auth";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import useAuthModal from "@/hooks/useAuthModal";
import Button from "./Button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

interface EditorProps {
  locationId: string;
  name: string;
}

const Editor: React.FC<EditorProps> = ({ locationId, name }) => {
  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm<PostCreationRequest>({
  //     resolver: zodResolver(PostValidator),
  //     defaultValues: {
  //       locationId,
  //       title: "",
  //       content: null,
  //     },
  //   });

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState({});
  const [body, setBody] = useState<string>("");

  const router = useRouter();
  const authModal = useAuthModal();

  const { mutate: createPost, isPending } = useMutation({
    mutationFn: async () => {
      const payload: PostCreationPayload = {
        title: title,
        content: content,
        locationId: locationId,
      };
      const { data } = await axios.post("/api/posts/upload", payload);
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
      setTitle("");
      setContent({});
      setBody("");
      toast.success("Successfully created post");
    },
  });

  const handleSubmit = async () => {
    setContent({
      body,
    });
    await createPost();
  };

  return (
    <div className="w-full p-4 bg-zince-50 rounded-md border border-zinc-50">
      <div className="w=fit">
        <div className="prose prose-stone dark:prose-invert flex-col flex gap-y-4">
          <Input
            value={title}
            placeholder="Title"
            className="border-none resize-none appearance-none overflow-hidden bg-transparent text-3xl font-bold focus:outline-none"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            value={body}
            placeholder="Content"
            className=" border-none resize-none appearance-none overflow-hidden bg-transparent text-lg focus:outline-none"
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full flex justify-end mt-4">
        <Button
          type="submit"
          onClick={() => {
            handleSubmit();
          }}
          isLoading={isPending}
          className="w-full"
        >
          Post
        </Button>
        {/* <CreatePost session={session} /> */}
      </div>
    </div>
  );
};

export default Editor;
