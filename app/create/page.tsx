"use client";

import Button from "@/components/Button";
import { Input } from "@/components/ui/input";
import { CreateLocationPayload } from "@/lib/validator/location";
import useAuthModal from "@/hooks/useAuthModal";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { HiArrowLeft } from "react-icons/hi";
import countryList from "react-select-country-list"
import Select, { SingleValue } from "react-select";


type CountryType = {
  label: string;
};

const Page = () => {
  const [locName, setLocName] = useState<string>("");
  const [locState, setLocState] = useState<string>("");
  const [locCountry, setLocCountry] = useState<CountryType>();

  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value: any) => {
    setLocCountry(value);
  };

  const router = useRouter();
  const authModal = useAuthModal();

  const handleSubmit = async () => {
    await createCommunity();
    setLocName("");
    setLocState("");
    setLocCountry({label: ""});
  };

  const { mutate: createCommunity, isPending } = useMutation({
    mutationFn: async () => {
      const payload: CreateLocationPayload = {
        name: locName,
        state: locState,
        country: locCountry!.label,
      };
      const { data } = await axios.post("/api/location", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast.error(
            "That location already exists, please choose a different location"
          );
        } else if (err.response?.status === 422) {
          return toast.error("Invalid location name");
        } else if (err.response?.status === 401) {
          authModal.onOpen();
          return toast.error("Login to continue");
        }
      }
    },
    onMutate: () => {
      isPending ? toast.loading("Creating community") : null;
    },
    onSuccess: () => {
      toast.success(`Succesfully created community for ${locName}`)
    }
  });

  const handleKeyPress = (event: { key: any }) => {
    if (event.key === "Enter") return handleSubmit();
  };

  return (
    <div className="flex-col items-center h-full max-w-3xl mx-auto">
      <div className="relative bg-white w-full h-fit rounded-lg space-y-6 py-10">
        <div className="flex gap-x-4 items-center">
          <HiArrowLeft
            className="hover:scale-110"
            onClick={() => router.back()}
          />
          Create a Destination Community
        </div>
      </div>

      <hr className="bg-zinc-500 h-px" />

      <div className="gap-y-10">
        <p className="text-lg font-medium pt-4">Name</p>
        <p className="text-xs pb-5">
          Community names including capitalization cannot be changed
        </p>

        <div className="flex w-full gap-x-3 pb-3">
          <div className="relative w-[50%]">
            <Input
              value={locName}
              onChange={(e) => setLocName(e.target.value)}
              className="capitalize"
              placeholder="Boston, Seattle, etc"
            />
          </div>

          <div className="relative w-[50%]">
            <Input
              value={locState}
              onChange={(e) => setLocState(e.target.value)}
              className="uppercase"
              placeholder="MA, WA, etc"
            />
          </div>
        </div>

        <div className="relative">
          <Select
            options={options}
            value={locCountry}
            onChange={changeHandler}
            onKeyDown={handleKeyPress}
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button className="w-[30%]" onClick={() => router.back()}>Cancel</Button>
          <Button
          className="bg-rose-400 text-white hover:bg-rose-400/70"
            isLoading={isPending}
            disabled={locName.length === 0}
            onClick={() => {
              handleSubmit();
            }}
          >
            Create Community
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
