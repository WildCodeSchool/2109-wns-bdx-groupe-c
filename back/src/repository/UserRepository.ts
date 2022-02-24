import User from '../models/AppUser';
import Argon2Password from '../helpers/Argon2Password';

class UserRepository extends User {

  static async findAll() {
    return await User.find({
      relations: ['projectsCreated','comments','role','tasks'],
      order: { id: 'DESC' }
    })
  }

  static async findOneById(id: number) {
    return await User.findOneOrFail({ id }, { relations: ['projectsCreated','comments','role','tasks'] })
  }

  static async createUser(firstName: string, lastName: string, email: string, password: string) {
    const user = new User()
    user.firstName = firstName
    user.lastName = lastName
    user.email = email
    user.password = await Argon2Password.hashPassword(password)
    user.isActive = true
    user.createdAt = new Date();
    user.updatedAt = new Date();
    return user.save()
  }

  static async deleteUser(id: number) {
    const user = await User.findOneOrFail({ id })
    user.firstName =  '';
    user.lastName = '';
    user.email= '';
    user.isActive = false;
    user.updatedAt= new Date();
    return user.save();
  }

}

export default UserRepository