"use client";

import Button from "@/components/Button";
import { Input } from "@/components/ui/input";
import { CreateLocationPayload } from "@/lib/location";
import useAuthModal from "@/hooks/useAuthModal";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { HiArrowLeft } from "react-icons/hi";

const Page = () => {
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const authModal = useAuthModal();

  const { mutate: createCommunity, isPending } = useMutation({
    mutationFn: async () => {
      const payload: CreateLocationPayload = {
        name: input,
      };
      const { data } = await axios.post("/api/location", payload);
      return data as string;
    },

    onError: (err) => {
        if (err instanceof AxiosError){
            if (err.response?.status === 409){
                return toast.error("That location already exists, please choose a different location")
            }
            else if (err.response?.status === 422){
                return toast.error("Invalid location name")
            }
            else if (err.response?.status === 401){
                authModal.onOpen()
                return toast.error("Login to continue")
            }
        }
    }
  });

  return (
    <div className="flex-col items-center h-full max-w-3xl mx-auto">
      <div className="relative bg-white w-full h-fit rounded-lg space-y-6 py-10">
        <div className="flex gap-x-4 items-center">
          <HiArrowLeft className="hover:scale-110" onClick={() => router.back()}/>
          Create a Destination Community
        </div>
      </div>

      <hr className="bg-zinc-500 h-px" />

      <div className="gap-y-10">
        <p className="text-lg font-medium pt-4">Name</p>
        <p className="text-xs pb-5">
          Community names including capitalization cannot be changed
        </p>

        <div className="relative">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="capitalize"
            placeholder="Boston, Seattle, etc"
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button onClick={() => router.back()}>Cancel</Button>
          <Button isLoading={isPending} disabled={input.length === 0} onClick={() => createCommunity()}>
            Create Community
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
