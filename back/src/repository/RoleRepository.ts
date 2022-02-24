import Role from '../models/Role'

class RoleRepository extends Role {
  static async findAll() {
    return await Role.find();
  }

  static async createRole(name: string, identifier: string) {
    const role = new Role();
    role.name = name;
    role.identifier = identifier;
    return role.save();
  }
}

export default RoleRepository