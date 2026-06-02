import { IUser, UserRole } from "./user.interface";

export const mockUsers: IUser[] = [
  {
    name: "María Admin",
    email: "admin@tallerdemaria.com",
    password: "admin1234",
    role: UserRole.Admin,
  },
  {
    name: "Juan Usuario",
    email: "juan@tallerdemaria.com",
    password: "user1234",
    role: UserRole.User,
  },
];
