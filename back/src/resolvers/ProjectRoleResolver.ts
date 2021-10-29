import { Arg, Args, ArgsType, Field, Int,Mutation, Query, Resolver } from "type-graphql";


import ProjectRole from "../models/ProjectRole";


@ArgsType()
class UpdateProjectRoleInput {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;
}

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
  @Mutation(()=>ProjectRole)
  async deleteProjectRole(@Arg("id") id:number) {
    const projectRole = await ProjectRole.findOneOrFail({id});
    await ProjectRole.remove(projectRole);
    return projectRole;
  }
  @Mutation(()=>ProjectRole)
  async updateProjectRole(@Args(){id, name}:UpdateProjectRoleInput) {
    const projectRole = await ProjectRole.findOneOrFail({id});
    await ProjectRole.update(projectRole, {name});
    const updatedProjectRole = await ProjectRole.findOneOrFail({id})
    return updatedProjectRole;
  }

}

export default ProjectRoleResolver;
