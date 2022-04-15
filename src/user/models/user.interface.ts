import { Role } from "./role.enum";

export interface User {
  id?: number;
  email?: string;
  password?: string;
  role?: Role;
  firstName?: string;
  lastName?: string;
  dniNumber?: number;
  phoneNumber?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}