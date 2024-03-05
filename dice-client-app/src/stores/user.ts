import { create } from "zustand";

export type User = {
  id: number;
  email: string;
  nickname: string;
  age: number;
  gender: string;
};

export type State = {
  userInfo: User[];
  loginUser: (
    id: number,
    email: string,
    nickname: string,
    age: number,
    gender: string
  ) => void;
  removeUser: () => void;
};

export type Actions = {};
export const useUserStore = create<State & Actions>((set) => ({
  userInfo: [],
  loginUser: (
    id: number,
    email: string,
    nickname: string,
    age: number,
    gender: string
  ) =>
    set((state) => ({
      userInfo: [
        ...state.userInfo,
        { id, email, nickname, age, gender, test: "test" },
      ],
    })),
  removeUser: () =>
    set((state) => ({
      userInfo: [],
    })),
}));
