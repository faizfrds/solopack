"use client";

import { useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";

const SubmitPageHeader = () => {
  const router = useRouter();
  return (
    <button>
      <HiArrowLeft onClick={() => router.back()} />
    </button>
  );
};

export default SubmitPageHeader;
