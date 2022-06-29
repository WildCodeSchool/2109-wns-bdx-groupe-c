export interface Language {
  id: number
  name: string
}

export interface Languages {
  id: number
  rating: string
  language: {
    name: string
  }
}
