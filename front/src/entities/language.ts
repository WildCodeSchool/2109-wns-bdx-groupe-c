export interface Language {
  id: number
  name: string
}

export interface MyLanguages {
  id: number
  language: {
    name: string
  }
  rating: number
}

export interface CreateLanguage {
  languageId: number
  language: {
    name: string
  }
  rating: number | null
}

