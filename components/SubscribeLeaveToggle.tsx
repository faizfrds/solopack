"use client";

import { SubscribeToLocationPayload } from "@/lib/validator/location";
import Button from "./Button";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import useAuthModal from "@/hooks/useAuthModal";
import { startTransition } from "react";
import { useRouter } from "next/navigation";

interface SubscribeLeaveToggleProps {
  locationId: string;
  locationName: string;
  isSubscribed: boolean;
}

const SubscribeLeaveToggle: React.FC<SubscribeLeaveToggleProps> = ({
  locationId,
  locationName,
  isSubscribed,
}) => {
  const authModal = useAuthModal();
  const router = useRouter();

  const {mutate: subscribe, isPending} = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToLocationPayload = {
        locationId,
      };

      const { data } = await axios.post("/api/location/subscribe", payload);
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

      return toast.success(`Joined ${locationName} community`)
    },
  });

  const {mutate: unsubscribe, isPending: isLoading} = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToLocationPayload = {
        locationId,
      };

      const { data } = await axios.post("/api/location/unsub", payload);
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

      return toast.success(`Left ${locationName} community`)
    },
  });

  return isSubscribed ? (
    <Button onClick={() => unsubscribe()} isLoading={isLoading} className="w-full rounded-md bg-rose-400 text-white capitalize hover:bg-rose-300 mt-3">
      Leave this community
    </Button>
  ) : (
    <Button onClick={() => subscribe()} isLoading={isPending} className="w-full rounded-md bg-rose-400 text-white capitalize hover:bg-rose-300 mt-3">
      Join this community
    </Button>
  );
};

export default SubscribeLeaveToggle;
