import { Task } from './task'
export interface Status {
  name: 'To Do' | 'In Progress' | 'Code Review' | 'Done'
  id: string
  tasks: Task[] | null
}
