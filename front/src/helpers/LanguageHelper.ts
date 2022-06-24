import { CreateLanguage } from '../entities/language'

export const emptyLanguage: CreateLanguage = {
  languageId: 0,
  language: {
    name: '',
  },
  rating: null,
}