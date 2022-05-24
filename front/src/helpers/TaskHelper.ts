import { createTaskType } from '../entities/task'

export const emptyTask: createTaskType = {
  subject: '',
  shortText: '',
  description: '',
  projectId: null,
  expectedDuration: '0',
  dueDate: '2022-09-09',
}