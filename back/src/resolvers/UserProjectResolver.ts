import { Args, ArgsType, Field, Query, Resolver, Int, Mutation } from 'type-graphql'

import UserProject from '../models/UserProject'
import User from '../models/User';
import Project from '../models/Project';
import ProjectRole from '../models/ProjectRole';

@ArgsType()
class MyProjectsInput {
  @Field(() => Int)
  userId!: number
}

@ArgsType()
class CreateUserProjectInput {
  @Field(() => Int)
  userID!: number

  @Field(() => Int)
  projectId!: number

  @Field(() => Int)
  roleId?: number
}

@Resolver(UserProject)
class UserProjectResolver {

  @Query(() => [UserProject])
  async myProjects(@Args() { userId }: MyProjectsInput) {
    const user = await User.findOne({ id: userId })
    const myProjects = await UserProject.find({
      relations: ['user', 'project', 'projectRole'],
      where: {
        user: user
      }
    })
    return myProjects
  }


  @Mutation(() => UserProject)
  async associateUserToProject(@Args() { userID, projectId, roleId }: CreateUserProjectInput) {
    const userProject = new UserProject();
    userProject.user = await User.findOneOrFail({ id: userID });
    userProject.project = await Project.findOneOrFail({ id: projectId });
    userProject.projectRole = await ProjectRole.findOneOrFail({ id: roleId });

    await userProject.save()
    return UserProject.findOne({ id: userProject.id }, { relations: ['user','project','projectRole'] })
  }


}

export default UserProjectResolver
