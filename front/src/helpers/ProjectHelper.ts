import { createProjectType, ProjectFromApi, Project } from '../entities/project'

export const emptyProject: createProjectType = {
  name: '',
  shortText: '',
  description: '',
  initialTimeSpent: 0,
}

export const hydrateProjectFromApi = (projectFromApi : ProjectFromApi): Project => ({
  id: parseInt(projectFromApi.id, 10),
  name: projectFromApi.name,
  shortText: projectFromApi.shortText,
  description: projectFromApi.description,
  initialTimeSpent: parseInt(projectFromApi.initialTimeSpent,10),
  createdAt: new Date(projectFromApi.createdAt),
  updatedAt: new Date (projectFromApi.updatedAt),
  countAssignee: parseInt(projectFromApi.countAssignee,10),
  createdBy: projectFromApi.createdBy,
  languages: projectFromApi.languages,
  tasks: projectFromApi.tasks,
  status: projectFromApi.status,
})