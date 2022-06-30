import { createTaskType, TaskFromApi, Task } from '../entities/task'

export const emptyTask: createTaskType = {
  subject: '',
  shortText: '',
  description: '',
  projectId: null,
  expectedDuration: '0',
  dueDate: '2022-09-09',
}

export const hydrateTaskFromApi = (taskFromApi : TaskFromApi): Task => ({
  id: taskFromApi.id,
  subject: taskFromApi.subject,
  shortText: taskFromApi.shortText,
  description: taskFromApi.description,
  createdAt: new Date (taskFromApi.createdAt),
  updatedAt: new Date (taskFromApi.updatedAt),
  dueDate: new Date(taskFromApi.createdAt),
  expectedDuration: taskFromApi.expectedDuration,
  spentTime: taskFromApi.spentTime,
  status: taskFromApi.status,
  project: taskFromApi.project,
  assignee: taskFromApi.assignee,
  comments: taskFromApi.comments,
})
