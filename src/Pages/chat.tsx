import { FormEvent, useState } from "react";
import { room, useUserStore } from "../Hooks/useUserStore";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firebaseAuth, firebaseFirestore } from "../Firebase/firebase";
const chat = () => {
  const { currentRoom } = room();
  const { currentUser } = useUserStore();
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const handleMessageSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message === "") {
      setError("Please enter a message");
      return;
    }
    const messageRef = collection(firebaseFirestore, "messages");
    await addDoc(messageRef, {
      room: currentRoom,
      text: message,
      username: currentUser?.displayName,
      userId: currentUser?.uid,
      userAvatar: firebaseAuth.currentUser?.photoURL,
      creeatedAt: serverTimestamp(),
    });
    setError("");
    setMessage("");
  };
  return (
    <div>
      <h1 className="text-center text-2xl">
        Welcome to <span className="font-semibold">{currentRoom}</span>
        <div className="">
          <form action="" onSubmit={handleMessageSubmit}>
            <input
              type="text"
              placeholder="Type your message here..."
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <button type="submit">Send</button>
          </form>
          {error && <p className="text-red-700">{error}</p>}
        </div>
      </h1>
    </div>
  );
};

export default chat;
