import { db } from "@/lib/db";
import SearchCard from "./SearchCard";
import axios, { Axios, AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { SearchLocationPayload } from "@/lib/validator/search";

type LocationType = {
    id: string;
    name: string;
    state: string | null;
    country: string;
    createdAt: Date;
    updatedAt: Date;
    creatorId: string | null;
    userId: string | null;
};

const SearchList = ({
  searchParams
}: {
  searchParams: LocationType[];
}) => {

  return (
    <div className="flex flex-col w-full gap-y-2">

      {searchParams.map((res) => (
        <SearchCard name={res.name} country={res.country}/>
      ))}
    </div>
  );
};

export default SearchList;
