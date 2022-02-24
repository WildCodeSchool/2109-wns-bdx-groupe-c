import ObjectHelpers from '../helpers/ObjectHelper';
import ProjectRole from '../models/ProjectRole'

class ProjectRoleRepository extends ProjectRole {
  static async findAll() {
    return await ProjectRole.find();
  }

  static async createProjectRole(name: string) {
    const projectRole = new ProjectRole();
    projectRole.name = name;
    return projectRole.save();
  }

  static async deleteProjectRole(id: number) {
    const projectRole = await ProjectRole.findOneOrFail({ id })
    const projectRoleCopy = ObjectHelpers.deepClone(projectRole);
    await ProjectRole.remove(projectRole)
    return projectRoleCopy
  }
}

export default ProjectRoleRepository