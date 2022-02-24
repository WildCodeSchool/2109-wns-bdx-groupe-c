import Language from "../models/Language";

class LanguageRepository extends Language {
    static async findAll() {
        return await Language.find();
    }

    static async createLanguage(name: string) {
        const language = new Language();
        language.name = name;
        return language.save();
    }

    static async deleteLanguage(id: number) {
      const language = await Language.findOneOrFail({ id })
      const languageCopy = { ...language };
      await Language.remove(language)
      return languageCopy
    }
}

export default LanguageRepository