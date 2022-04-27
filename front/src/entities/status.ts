import { Task } from './task';
export interface Status {
  id: number
  name: string
  tasks: Task[] | null
}
