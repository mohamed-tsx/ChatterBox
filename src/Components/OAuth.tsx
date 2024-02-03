import { BsGithub } from "react-icons/bs";
import { GrGoogle } from "react-icons/gr";

const OAuth = () => {
  const handleGithubAuthClick = () => {
    // Implement OAuth logic here
    console.log("OAuth button of Github got clicked");
  };

  const handleGoogleAuthClick = () => {
    // Implement OAuth logic here
    console.log("OAuth button of Google got clicked");
  };

  return (
    <div className="flex flex-col gap-5 mt-20">
      <button
        onClick={handleGoogleAuthClick}
        className="flex items-center gap-3 bg-red-500 p-3 text-white rounded-lg"
      >
        <GrGoogle />
        Continue with Google
      </button>
      <div className="flex items-center gap-4">
        <div className="flex-grow h-0.5 bg-gray-300"></div>
        <p className="text-gray-500">or</p>
        <div className="flex-grow h-0.5 bg-gray-300"></div>
      </div>
      <button
        onClick={handleGithubAuthClick}
        className="flex items-center gap-3 bg-gray-900 p-3 text-white rounded-lg "
      >
        <BsGithub />
        Continue with Github
      </button>
    </div>
  );
};

export default OAuth;
