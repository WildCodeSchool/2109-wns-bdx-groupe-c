import ObjectHelpers from '../helpers/ObjectHelper';
import UserProject from '../models/UserProject'
import User from '../models/AppUser';
import Project from '../models/Project';
import ProjectRole from '../models/ProjectRole';
import Status from '../models/Status';

class UserProjectRepository extends UserProject {
  static async findAll(userId: number) {
    const user = await User.findOne({ id: userId })
    return await UserProject.find({
      relations: ['user', 'project', 'projectRole', 'project.languages', 'project.tasks', 'project.tasks.assignee', 'project.status'],
      where: {
        user: user
      }
    })
  }

  static async findByUserIdAndStatusName(userId: number, statusName: string) {
    const user = await User.findOne({ id: userId })
    const status = await Status.findOne({ name: statusName })
    return await UserProject.find({
      relations: ['user', 'project', 'projectRole', 'project.languages', 'project.tasks', 'project.tasks.assignee', 'project.status'],
      where: {
        user: user,
        project: { status: status }
      }
    })
  }

  static async createUserProject( userId: number, projectId: number, roleId: number) {
    const userProject = new UserProject();
    const user = await User.findOneOrFail({ id: userId })
    const project = await Project.findOneOrFail({ id: projectId })
    const role = await ProjectRole.findOneOrFail({ id: roleId })
    userProject.user = user;
    userProject.project = project;
    userProject.projectRole = role;
    return userProject.save();
  }

  static async deleteUserProject(id: number) {
    const userProject = await UserProject.findOneOrFail({ id: id }, { relations: ['user','project','projectRole'] })
    const userProjectCopy = ObjectHelpers.deepClone(userProject);
    await UserProject.remove(userProject)
    return userProjectCopy
  }

  static async updateUserProject(userProjectId: number, roleId: number) {
    const userProject = await UserProject.findOneOrFail({ id: userProjectId });
    const role = await ProjectRole.findOneOrFail({ id: roleId });
    userProject.projectRole = role;
    await userProject.save()
    return UserProject.findOne({ id: userProject.id }, { relations: ['user','project','projectRole'] })
  }
}

export default UserProjectRepository