import Language from '../models/Language'

export const languageGenerator = async (name: string) => {
  const language = new Language();
  language.name = name;
  return await language.save();
};