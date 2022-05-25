import { Role } from "./role.enum";

export interface User {
  id?: number;
  email?: string;
  password?: string;
  role?: Role;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  dniNumber?: string;
  phoneNumber?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}