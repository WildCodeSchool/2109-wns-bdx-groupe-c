import { hash, compare } from "bcrypt";
import User from '../models/AppUser';
import AppUserSessionRepository from './UserSessionRepository';
class UserRepository extends User {

  static async findAll() {
    return await User.find({
      relations: ['projectsCreated','comments','role','tasks'],
      order: { lastName: 'ASC' }
    })
  }

  static async findOneById(id: number) {
    return await User.findOneOrFail({ id }, { relations: ['projectsCreated','comments','role','tasks'] })
  }

  static async signUp(firstName: string, lastName: string, email: string, password: string): Promise<User | undefined> {
    const existingUser = await User.findOne({ where: { email } });

    if(existingUser) {
      throw new Error('Could not sign up with provided email address.');
    } else {
      const user = new User()
      user.firstName = firstName
      user.lastName = lastName
      user.email = email
      user.password = await hash(password, 10)
      user.isActive = true
      user.createdAt = new Date();
      user.updatedAt = new Date();
      return user.save()
    }
  }

  static async signIn(email: string, password: string, onSessionCreated: (sessionId: string) => void): Promise<User> {
    const ERROR = 'Could not sign in with provided email address and password.';

    const user = await User.findOne({ where: { email } });
    if(!user) {
      throw new Error(ERROR);
    } else {
      const isPasswordCorrect = await compare(password, user.password);
      if(!isPasswordCorrect) {
        throw new Error(ERROR);
      } else {
        const session = await AppUserSessionRepository.createSession(user);
        onSessionCreated(session.id)
        return user;
      }
    }
  }

  static async logOut(sessionId: string): Promise<Boolean> {
    const ERROR = 'Could not logout a user without session';

    const session = await AppUserSessionRepository.findOneBySessionId(sessionId);
    if(!session) {
      throw new Error(ERROR);
      return false;
    } else {
      await AppUserSessionRepository.deleteSession(sessionId);
      return true
    }
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

  static async updateMyInformations(
    user: User | null,
    firstName: string | undefined,
    lastName: string | undefined,
    email: string | undefined,
    password: string | undefined
  ) {
    if (!user) {
      throw new Error('User is not logged in')
    }
    return user.updateInformation(firstName, lastName, email, password);
  }

}

export default UserRepository