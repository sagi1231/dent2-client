import { User } from "../core/entities/user";
import { atom, atomFamily, selector, selectorFamily } from "recoil";
import authService from "../core/services/auth.service";

export const userStateSelector = selector<User>({
  key: "userStateSelector",
  get: () => authService.me(),
});

export const userState = atom<User>({
  key: "userState",
  default: userStateSelector,
});

// export const usersState = selector<User[]>({
//   key: "usersState",
//   get: ({ get }) => AuthService.getUsers(),
// });

// SUPER ADMIN ONLY!
// export const allUsersState = atomFamily<User[], string>({
//   key: "allUsersState",
//   default: (query: string) => authService.getAllUsers(query),
// });
