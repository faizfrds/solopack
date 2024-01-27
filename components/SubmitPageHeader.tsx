"use client";

import { useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";

const SubmitPageHeader = () => {
  const router = useRouter();
  return (
    <button className="ml-3">
      <HiArrowLeft onClick={() => router.back()} />
    </button>
  );
};

export default SubmitPageHeader;
