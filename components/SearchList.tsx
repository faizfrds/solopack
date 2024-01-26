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


//     const {mutate: search, isPending: isLoading} = useMutation({
//         mutationFn: async () => {
//           const payload: SearchLocationPayload = {
//             name: searchParams,
//           };
    
//           const { data } = await axios.post("/api/search", payload);
//           return data;
//         },
    
//         // onError: (err) => {
//         //   if (err instanceof AxiosError) {
//         //     if (err.response?.status === 401) {
//         //       authModal.onOpen();
//         //       return toast.error("Login to continue");
//         //     } else {
//         //       return toast.error("Error during the process, try again");
//         //     }
//         // //   }
//         // // },
    
//         // onSuccess: () => {
//         //   startTransition(() => {
//         //     router.refresh()
//         //   });
    
//         //   return toast.success(`Left ${locationName} community`)
//         // },
//       });

//       const payload: SearchLocationPayload = {
//         name: searchParams,
//       };

//       const res: Location
// //   let results: LocationType[] = axios.get() db.location.findMany({
// //     where: {
// //       name: {
// //         contains: searchParams,
// //       },
// //     },
// //   });

  return (
    <div className="flex flex-col w-full gap-y-2">

      {searchParams.map((res) => (
        <SearchCard name={res.name} country={res.country}/>
      ))}
    </div>
  );
};

export default SearchList;
