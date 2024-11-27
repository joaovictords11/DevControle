import { FiLoader } from "react-icons/fi";

const Loading = () => {
  return (
    <div className="w-full mt-8 flex justify-center items-center opacity-40">
      <FiLoader size={80} color="#4b5563" className="animate-spin" />
    </div>
  );
};

export default Loading;
