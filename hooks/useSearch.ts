import { create } from "zustand";

interface SearchStore {
    onChange: (e: string) => void;
    params: string;
};

const useSearch = create<SearchStore>((set) => ({
    params: "",
    onChange: (e: string) => set({params: e})
}));

export default useSearch;