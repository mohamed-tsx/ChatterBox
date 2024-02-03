import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-5">
        <Link to={"/"}>ChatterBox</Link>
        <ul className="flex gap-9 items-center">
          <li>
            <Link to={"/chat"}>Chat</Link>
          </li>
          <li>
            <Link
              className="p-2 bg-red-500 text-white text-center rounded-md flex gap-2 items-center"
              to={"/login"}
            >
              <FaLock />
              Login
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
