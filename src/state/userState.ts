import { User } from "../core/entities/user";
import { atom, atomFamily, selector, selectorFamily } from "recoil";
import authService from "../core/services/auth.service";
import { UserRole } from "../core/types/userRole";

// export const userStateSelector = selector<User>({
//   key: "userStateSelector",
//   get:  isActive: true,
//   },
// });

export const userState = atom<User>({
  key: "userState",
  default: {
    id: "asass",
    firstname: "שגיא",
    lastname: "שמחי",
    hashedPassword: "aaaaa",

    role: UserRole.VIEWER,

    pNumber: "9203586",
    permissions: "asas",
    isActive: true,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
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
