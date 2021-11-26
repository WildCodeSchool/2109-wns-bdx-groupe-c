import Project from '../models/Project'

export const projectGenerator = async (name: string, description: string, shortText:string, initialTimeSpent:0) => {
  const projectTest = new Project()
  projectTest.name = 'Test'
  projectTest.description = 'Test'
  projectTest.shortText = 'Test'
  projectTest.initialTimeSpent = 0
  projectTest.createdAt = new Date('2021-11-23T23:18:00.134Z')
  projectTest.updatedAt = new Date('2021-11-23T23:18:00.134Z')
  return await projectTest.save()
}