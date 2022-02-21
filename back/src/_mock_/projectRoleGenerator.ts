import ProjectRole from "../models/ProjectRole";

export const projectRoleGenerator = async (name: string) => {
  const projectRole = new ProjectRole();
  projectRole.name = name;
  return await projectRole.save();
}