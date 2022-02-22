import Language from '../models/Language';
import User from '../models/User';
import UserLanguage from '../models/UserLanguage';

export const userLanguageGenerator = async (user: User, language: Language, rating: number) => {
  const userLanguage = new UserLanguage();
  userLanguage.language = language;
  userLanguage.user = user;
  userLanguage.rating = rating;
  return await userLanguage.save();
};