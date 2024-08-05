import { User } from "../core/entities/user";
import { atom, atomFamily, selector, selectorFamily } from "recoil";
import authService from "../core/services/auth.service";
import { UserRole } from "../core/types/userRole";
import userService from "../core/services/user.service";
export const userStateSelector = selector<User>({
  key: "userStateSelector",
  get: () => userService.whoAmI(),
});

export const userState = atom<User>({
  key: "userState",
  default: undefined,
});

export const usersState = selector<User[]>({
  key: "usersState",
  get: ({ get }) => userService.getUsers(),
});

// SUPER ADMIN ONLY!
export const allUsersState = atomFamily<User[], string>({
  key: "allUsersState",
  default: (query: string) => userService.getAllUsers(query),
});
