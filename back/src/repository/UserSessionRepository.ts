import AppUserSession from '../models/AppUserSession';
import {getRandomHexID} from '../helpers/helper';

import User from '../models/AppUser';

class AppUserSessionRepository extends AppUserSession {

  static async findOneBySessionId(sessionId: string): Promise<User | null> {
    const session = await AppUserSession.findOne({ id: sessionId }, { relations: ['user', 'user.role'] });
    return session?.user || null;
  }

  static async createSession(user: User): Promise<AppUserSession> {
    const session = new AppUserSession();
    session.id = getRandomHexID();
    session.user = user;
    await session.save();
    return session;
  }

  static async deleteSession(sessionId: string): Promise<void> {
    await AppUserSession.delete({ id: sessionId });
  }

}

export default AppUserSessionRepository