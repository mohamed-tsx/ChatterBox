import { room } from "../Hooks/useUserStore";
const chat = () => {
  const { currentRoom } = room();
  return (
    <div>
      <h1 className="text-center text-2xl">
        Welcome to <span className="font-semibold">{currentRoom}</span>
      </h1>
    </div>
  );
};

export default chat;
