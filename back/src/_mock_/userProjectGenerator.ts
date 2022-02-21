import UserProject from '../models/UserProject';
import User from '../models/User';
import Project from '../models/Project';
import ProjectRole from '../models/ProjectRole';

export const userProjectGenerator = async (user: User, project: Project, projectRole: ProjectRole) => {
  const userProject = new UserProject();
  userProject.user = user;
  userProject.project = project;
  userProject.projectRole = projectRole;
  return await userProject.save();
}