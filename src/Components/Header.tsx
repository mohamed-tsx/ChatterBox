import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUserStore } from "../Hooks/useUserStore";
import { BiLogOut } from "react-icons/bi";
import { firebaseAuth } from "../Firebase/firebase";

const Header = () => {
  const { currentUser, setLogout } = useUserStore();

  const handleLogout = () => {
    console.log("ad");
    setLogout();
    firebaseAuth.signOut();
  };

  return (
    <header className="">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-5">
        <Link to={"/"}>ChatterBox</Link>
        <ul className="flex gap-9 items-center">
          <li>
            <Link to={"/chat"}>Chat</Link>
          </li>
          <li className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3 flex-row-reverse">
                <button
                  onClick={handleLogout}
                  className="p-2 bg-red-500 text-white text-center rounded-md flex gap-2 items-center"
                >
                  <BiLogOut />
                  Logout
                </button>
                {currentUser.photoURL !== null ? (
                  <img
                    src={currentUser.photoURL}
                    alt="Profile pic"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div>No Photo</div>
                )}
              </div>
            ) : (
              <Link
                className="p-2 bg-red-500 text-white text-center rounded-md flex gap-2 items-center"
                to={"/login"}
              >
                <FaLock />
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
