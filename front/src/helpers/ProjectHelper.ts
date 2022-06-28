import { createProjectType } from '../entities/project'

export const emptyProject: createProjectType = {
  name: '',
  shortText: '',
  description: '',
  initialTimeSpent: 0,
}