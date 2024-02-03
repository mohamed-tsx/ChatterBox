import { GrGoogle } from "react-icons/gr";

const OAuth = () => {
  return (
    <button className="flex items-center gap-3 bg-red-500 p-3 text-white rounded-lg">
      <GrGoogle />
      Continue with Google
    </button>
  );
};

export default OAuth;
