import { Status } from './status'
import { User } from './user'
import { Project } from './project'
import { Comment } from './comment'
export interface Task {
  id: string
  subject: string
  shortText: string
  description: string
  createdAt: Date
  updatedAt: Date
  dueDate: Date
  expectedDuration: number
  spentTime: number
  status: Status
  project: Project
  assignee: User
  comments: Comment[]

}
