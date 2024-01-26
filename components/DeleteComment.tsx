"use client";

import { SubscribeToLocationPayload } from "@/lib/validator/location";
import Button from "./Button";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import useAuthModal from "@/hooks/useAuthModal";
import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { CommentingValidatorPayload } from "@/lib/validator/comment";
import { FaRegTrashAlt } from "react-icons/fa";

interface DeleteCommentProps {
  authorId: string;
  id: string;
  isOwner: boolean;
}

const DeleteComment: React.FC<DeleteCommentProps> = ({
  authorId,
  id,
  isOwner,
}) => {
  const authModal = useAuthModal();
  const router = useRouter();

  const {mutate: deleteComment, isPending: isLoading} = useMutation({
    mutationFn: async () => {
      const payload = {
        id,
      };

      const { data } = await axios.post("/api/comments/delete", payload);
      return data as string;
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          authModal.onOpen();
          return toast.error("Login to continue");
        } else {
          return toast.error("Error during the process, try again");
        }
      }
    },

    onSuccess: () => {
      startTransition(() => {
        router.refresh()
      });

      return toast.success(`Deleted comment`)
    },
  });

  return isOwner ? (
    <Button onClick={() => deleteComment()} isLoading={isLoading} className="text-red-400 bg-transparent w-fit">
      {isLoading ? null : <FaRegTrashAlt className="text-red-500"/>}
    </Button>
  ) : (
    null
  );
};

export default DeleteComment;
