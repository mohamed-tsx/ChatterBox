import { User } from "firebase/auth";
import { create } from "zustand";

type StoreType = {
  currentUser: User | undefined | null;
  setCurrentUser: (user: User | null) => void;
  setLogout: () => void;
};

const initialState = {
  currentUser: null,
};
type RoomType = {
  currentRoom: null | undefined | string;
  setRoom: (room: string) => void; // Adjust the type of the argument
};

export const room = create<RoomType>((set) => ({
  currentRoom: null,
  setRoom: (room) => set({ currentRoom: room }),
}));

export const useUserStore = create<StoreType>((set) => ({
  currentUser: undefined,
  setCurrentUser: (user) => set({ currentUser: user }),
  setLogout: () => set(initialState),
}));
