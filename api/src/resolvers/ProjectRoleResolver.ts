import { Arg, Mutation, Query, Resolver } from "type-graphql";


import ProjectRole from "../models/ProjectRole";

@Resolver(ProjectRole)
class ProjectRoleResolver {
  @Query(() => [ProjectRole])
  async projectRoles() {
    const projectRoles = await ProjectRole.find();
    return projectRoles;
  }
  @Mutation(()=>ProjectRole)
  async createProjectRole(@Arg("name") name:string) {
    const projectRole = new ProjectRole();
    projectRole.name = name;
    await projectRole.save();
    return projectRole;
  }

}

export default ProjectRoleResolver;
