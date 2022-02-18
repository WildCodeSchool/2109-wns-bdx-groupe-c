import Role from '../models/Role'

export const roleGenerator = async (name: string, identifier: string) => {
  const role = new Role();
  role.name = name;
  role.identifier = identifier;
  return await role.save();
};