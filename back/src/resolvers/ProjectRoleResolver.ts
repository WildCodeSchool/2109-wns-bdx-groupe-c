import { Arg, Args, ArgsType, Field, Int,Mutation, Query, Resolver } from "type-graphql";


import ProjectRole from "../models/ProjectRole";
import ProjectRoleRepository from "../repository/ProjectRoleRepository";

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
    return ProjectRoleRepository.findAll();
  }
  @Mutation(()=>ProjectRole)
  async createProjectRole(@Arg("name") name:string) {
    return ProjectRoleRepository.createProjectRole(name);
  }
  @Mutation(()=>ProjectRole)
  async deleteProjectRole(@Arg("id") id:number) {
    return ProjectRoleRepository.deleteProjectRole(id);
  }
  @Mutation(() => ProjectRole)
  async updateProjectRole(@Args() { id, name }: UpdateProjectRoleInput) {
    const projectRole = await ProjectRole.findOneOrFail({ id })
    return projectRole.update(name);
  }

}

export default ProjectRoleResolver;
