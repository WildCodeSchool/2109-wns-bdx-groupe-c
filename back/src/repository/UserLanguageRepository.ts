import UserLanguage from '../models/UserLanguage'
import User from '../models/AppUser';
import Language from '../models/Language';
import ObjectHelpers from '../helpers/ObjectHelper';

class UserLanguageRepository extends UserLanguage {
  static async findAll(user: User | null) {
    if (!user) {
      throw new Error('User is not logged in')
    }
    return await UserLanguage.find({
      relations: ['user', 'language'],
      where: {
        user: user
      }
    });
  }

  static async addLanguageToUser(user: User | null, rating: number, languageId: number) {
    if (!user) {
      throw new Error('User is not logged in')
    }
    const userLanguage = new UserLanguage();
    const language = await Language.findOneOrFail({ id: languageId })
    userLanguage.rating = rating;
    userLanguage.language = language;
    userLanguage.user = user;
    await userLanguage.save();
    return userLanguage;
  }

  static async deleteUserLanguage(id: number) {
    const userLanguage = await UserLanguage.findOneOrFail({ id: id })
    const userLanguageCopy = ObjectHelpers.deepClone(userLanguage);
    await UserLanguage.remove(userLanguage)
    return userLanguageCopy
  }
}

export default UserLanguageRepository