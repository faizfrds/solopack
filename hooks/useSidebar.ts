import { useEffect } from "react";
import { create } from "zustand";

interface NavbarStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
};

const useSidebar = create<NavbarStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
    onToggle: () => set((state) => ({ isOpen: !state.isOpen})),

})
);

export default useSidebar;