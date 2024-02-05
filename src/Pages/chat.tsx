import { FormEvent, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  DocumentData,
  orderBy,
} from "firebase/firestore";
import { firebaseAuth, firebaseFirestore } from "../Firebase/firebase";
import { room, useUserStore } from "../Hooks/useUserStore";

const Chat = () => {
  interface Message {
    text: string;
    username?: string;
    userId?: string;
    userAvatar?: string;
    createdAt?: any;
  }
  const { currentRoom } = room();
  const { currentUser } = useUserStore();
  const [newMessage, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [error, setError] = useState<string>("");
  const messageRef = collection(firebaseFirestore, "messages");

  const handleMessageSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newMessage === "") {
      setError("Please enter a message before sending.");
      return;
    }

    await addDoc(messageRef, {
      room: currentRoom,
      text: newMessage,
      username: currentUser?.displayName,
      userId: currentUser?.uid,
      userAvatar: firebaseAuth.currentUser?.photoURL,
      createdAt: serverTimestamp(),
    });

    setError("");
    setMessage("");
  };

  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("room", "==", currentRoom),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot<DocumentData, DocumentData>(
      queryMessages,
      (snapshot) => {
        let messagesHolder: any[] = [];
        snapshot.forEach((doc) => {
          messagesHolder.push({ ...doc.data(), id: doc.id });
        });
        console.log(messages);
        setMessages(messagesHolder);
      }
    );

    return () => unsuscribe();
  }, []);

  return (
    <div className="mx-auto max-w-[1000px] p-6 bg-white rounded-md shadow-md">
      <h1 className="text-center text-2xl font-semibold mb-4">
        Welcome to {currentRoom}
      </h1>
      <div
        className="overflow-y-auto max-h-48 mb-4 scrollbar-thin sm:max-h-full"
        style={{ scrollbarWidth: "thin" }}
      >
        {messages.map((message) => (
          <div
            key={message.userId}
            className={`flex items-start mb-4 ${
              message.userId === currentUser?.uid
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div className="flex items-center">
              <img
                src={message.userAvatar}
                alt="User Avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
              <div className="bg-gray-200 p-3 rounded-md">
                <p className="font-semibold">{message.username}</p>
                <p>{message.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {error && <p className="text-red-700 mb-4">{error}</p>}
      <form onSubmit={handleMessageSubmit}>
        <input
          type="text"
          placeholder="Type your message here..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
          onChange={(e) => setMessage(e.target.value)}
          value={newMessage}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
