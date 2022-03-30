import { hash } from "bcrypt";

import Role from '../models/Role';
import User from '../models/AppUser';

export const userGenerator = async (firstname: string, lastname: string, email: string, password: string, role? : Role) => {
  const userTest = new User();
  userTest.firstName = firstname;
  userTest.lastName = lastname;
  userTest.email = email;
  userTest.password = await hash(password, 10);
  userTest.createdAt = new Date('2021-11-23T23:18:00.134Z');
  userTest.updatedAt = new Date('2021-11-23T23:18:00.134Z');
  if (role) userTest.role = role;

  return await userTest.save();
}