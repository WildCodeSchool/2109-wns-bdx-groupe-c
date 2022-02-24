import { Status } from './status'

export interface Task {
  id: number
  subject: string
  shortText: string
  status: Status
  description: string
  createdAt: Date
}
