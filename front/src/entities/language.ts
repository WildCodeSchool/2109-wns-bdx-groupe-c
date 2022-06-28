export interface Language {
  id: number
  name: string
}

export interface Languages {
  id: number
  rating: number
  language: {
    name: string
  }
}

export interface Languages_languages {
  languages: {
    id: number
    rating: number
    language: {
      name: string
    }
  }
}

export interface MyLanguages {
  id: number
  rating: number
  language: {
    name: string
  }
}

export interface MyLanguages_MyLanguages {
  myLanguages: {
    id: number
    rating: number
    language: {
      name: string
    }
  }
}

export interface AddLanguageToMe {
  id: number
  rating: number
}

