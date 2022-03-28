import { Args, ArgsType, Field, Query, Resolver, Int, Mutation } from 'type-graphql'

import UserProject from '../models/UserProject'
import User from '../models/AppUser';
import Project from '../models/Project';
import ProjectRole from '../models/ProjectRole';
import ObjectHelpers from '../helpers/ObjectHelper';

import UserProjectRepository from '../repository/UserProjectRepository';

@ArgsType()
class MyProjectsInput {
  @Field(() => Int)
  userId!: number

  @Field(() => String, { nullable: true })
  statusName?: string
}

@ArgsType()
class CreateUserProjectInput {
  @Field(() => Int)
  userId!: number

  @Field(() => Int)
  projectId!: number

  @Field(() => Int)
  roleId!: number
}

@ArgsType()
class updateUserRoleInput {
  @Field(() => Int)
  userProjectId!: number

  @Field(() => Int)
  roleId!: number
}

@ArgsType()
class deleteUserProjectInput {
  @Field(() => Int)
  userProjectId!: number
}

@Resolver(UserProject)
class UserProjectResolver {

  @Query(() => [UserProject])
  async myProjects(@Args() { userId, statusName }: MyProjectsInput) {
    if (statusName) {
      return UserProjectRepository.findByUserIdAndStatusName(userId, statusName);
    } else {
      return UserProjectRepository.findAll(userId);
    }
  }

  @Mutation(() => UserProject)
  async associateUserToProject(@Args() { userId, projectId, roleId }: CreateUserProjectInput) {
    return UserProjectRepository.createUserProject(userId, projectId, roleId);
  }

  @Mutation(() => UserProject)
  async updateUserRoleToProject(@Args() { userProjectId, roleId }: updateUserRoleInput) {
    return UserProjectRepository.updateUserProject(userProjectId, roleId);
  }

  @Mutation(() => UserProject)
  async deleteUserFromProject(@Args() { userProjectId }: deleteUserProjectInput) {
    return UserProjectRepository.deleteUserProject(userProjectId);
  }


}

export default UserProjectResolver
