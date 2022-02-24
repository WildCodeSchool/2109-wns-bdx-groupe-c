import UserLanguage from '../models/UserLanguage'
import User from '../models/AppUser';
import Language from '../models/Language';

class UserLanguageRepository extends UserLanguage {
  static async findAll(userId: number) {
    const user = await User.findOneOrFail({ id: userId })
    return await UserLanguage.find({
      relations: ['user', 'language'],
      where: {
        user: user
      }
    });
  }

  static async addLanguageToUser(userId: number, rating: number, languageId: number) {
    const userLanguage = new UserLanguage();
    const language = await Language.findOneOrFail({ id: languageId })
    const user = await User.findOneOrFail({ id: userId })
    userLanguage.rating = rating;
    userLanguage.language = language;
    userLanguage.user = user;
    await userLanguage.save();
    return userLanguage;
  }

  static async deleteUserLanguage(id: number) {
    const userLanguage = await UserLanguage.findOneOrFail({ id: id })
    const userLanguageCopy = { ...userLanguage };
    await UserLanguage.remove(userLanguage)
    return userLanguageCopy
  }
}

export default UserLanguageRepository