"use client"

import { useRouter } from "next/navigation";
import { FiRefreshCcw } from "react-icons/fi";

const ButtonRefresh = () => {
  const router = useRouter();

  return (
    <button className="bg-gray-700 hover:bg-black duration-200 px-2 py-1 rounded" onClick={() => router.refresh()}>
      <FiRefreshCcw size={24} color="white" />
    </button>
  );
};

export default ButtonRefresh;
