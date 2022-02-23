import { User } from './user'
import { Language } from './language'

export interface MyProject {
  id: number
  user: User
  project: Project
  projectRole: ProjectRole
}

export interface Project {
  name: string
  shortText: string
  countAssignee: number
  languages: Language[]
}

export interface ProjectRole {
  name: string
}
