import {User} from './user'
import {Task} from './task'

export interface Comment {
  id: number
  content: string
  createdAt: Date
  updatedAt: Date
  user: User
  task: Task
}
