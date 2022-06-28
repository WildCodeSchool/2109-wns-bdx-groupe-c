import { User } from './user'
import { Language } from './language'
import {Task} from './task'
import {Status} from './status'
export interface MyProject {
  id: number
  user: User
  project: Project
  projectRole: ProjectRole
}

export interface Project {
  id: number
  name: string
  shortText: string
  description: string
  initialTimeSpent: number
  createdAt: Date
  updatedAt: Date
  countAssignee: number
  createdBy: User
  languages: Language[]
  tasks: Task[]
  status: Status
}

export interface ProjectRole {
  id: number
  name: string
}

export interface createProjectType {
  name: string
  description: string
  initialTimeSpent: number
  shortText: string
}
