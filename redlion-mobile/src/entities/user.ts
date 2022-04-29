import {Role} from './role';
import {Comment} from './comment';
import {Project} from './project';
import {Task} from './task';
import {Language} from './language';

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  role?: Role
  comments?: Comment[]
  projectsCreated?: Project[]
  tasks?: Task[]
}

export interface UserLanguage {
  id: number
  rating: number
  user: User
  language: Language
}

export interface SignIn {
  id: number
  email: string
}
