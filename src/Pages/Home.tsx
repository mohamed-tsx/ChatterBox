import { useState, FormEvent } from "react";
import { room, useUserStore } from "../Hooks/useUserStore";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useUserStore();
  const { setRoom } = room();

  if (!currentUser) {
    navigate("/login");
  }

  const [roomCode, setRoomCode] = useState<string>("");
  const [error, setError] = useState<string | null>("");

  const handleJoinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (roomCode == "") {
      setError("Invalid");
      return;
    }
    setError(null);
    setRoomCode("");
    setRoom(roomCode);
    navigate("/chat");
  };

  return (
    <div className="flex justify-center items-center gap-2 flex-col mt-56">
      <form
        onSubmit={handleJoinRoom}
        className="flex items-center justify-center flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Enter the room id"
          className="border-2 p-3 rounded-md"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
        />
        <button
          type="submit"
          className="flex items-center gap-3 bg-gray-900 p-3 text-white rounded-md"
        >
          {/* <BsGithub /> */}
          Enter chat
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default Home;
