import { Task } from './task';
export interface Status {
  id: string
  name: string
  tasks: Task[] | null
}
