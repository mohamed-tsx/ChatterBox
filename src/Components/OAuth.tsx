import { BsGithub } from "react-icons/bs";
import { GrGoogle } from "react-icons/gr";
import { firebaseAuth } from "../Firebase/firebase";
import {
  AuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useUserStore } from "../Hooks/useUserStore";

const OAuth = () => {
  const { currentUser } = useUserStore();
  const handleGithubAuthClick = (Provider: AuthProvider) => {
    signInWithPopup(firebaseAuth, Provider);
    console.log(currentUser);

    console.log("OAuth button of Github got clicked");
  };

  const handleGoogleAuthClick = (Provider: AuthProvider) => {
    // Implement OAuth logic here
    signInWithPopup(firebaseAuth, Provider)
      .then(() => {
        console.log("Signed In! ✅");
        console.log(currentUser);
      })
      .catch(() => {
        console.log(`Something went wrong`);
      })
      .finally(() => {
        console.log(false);
      });

    console.log("OAuth button of Github got clicked");
  };

  return (
    <div className="flex flex-col gap-5 mt-20">
      <button
        onClick={() => handleGoogleAuthClick(new GoogleAuthProvider())}
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
        onClick={() => handleGithubAuthClick(new GithubAuthProvider())}
        className="flex items-center gap-3 bg-gray-900 p-3 text-white rounded-lg "
      >
        <BsGithub />
        Continue with GitHub
      </button>
    </div>
  );
};

export default OAuth;
