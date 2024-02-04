import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import SignIn from "./Pages/Login";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./Firebase/firebase";
import { useUserStore } from "./Hooks/useUserStore";
import { useEffect } from "react";
import Chat from "./Pages/chat";

const App = () => {
  const { setCurrentUser } = useUserStore();
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setCurrentUser(user);
    });
  }, []);
  return (
    <div className="">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
};

export default App;
