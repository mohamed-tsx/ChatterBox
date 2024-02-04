import { useUserStore } from "../Hooks/useUserStore";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate()
  const { currentUser } = useUserStore();
  if (!currentUser) navigate("/login")
  return <div>
    <h1>This home welcome</h1>
  </div>;
};

export default Home;
