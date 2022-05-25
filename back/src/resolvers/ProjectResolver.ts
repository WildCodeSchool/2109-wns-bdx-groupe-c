import { Arg, Args, ArgsType, Field, Int, Mutation, Query, Resolver, Ctx, Authorized } from 'type-graphql'
import { CustomContext } from "../type";

import ProjectRepository from '../repository/ProjectRepository'

import Project from '../models/Project'
import Status from '../models/Status'
import { ROLE_ADMIN } from '../constants';

@ArgsType()
class CreateProjectInput {
  @Field()
  name!: string

  @Field()
  shortText!: string

  @Field()
  description!: string

  @Field()
  initialTimeSpent!: number
}

@ArgsType()
class UpdateProjectInput {
  @Field(() => Int)
  id!: number

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  shortText?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  initialTimeSpent?: number
}

@ArgsType()
class UpdateProjectLanguageInput {
  @Field(() => Int)
  id!: number

  @Field(() => [Int])
  languagesId!: number[]
}

@ArgsType()
class UpdateProjectStatusInput {
  @Field(() => Int)
  id!: number

  @Field(() => Int)
  statusId!: number
}


@Resolver(Project)
class ProjectResolver {
  @Query(() => [Project])
  async projects() {
    return ProjectRepository.findAll();
  }

  @Query(() => Project)
  async project(@Arg('id') id: number) {
    return ProjectRepository.findOneById(id);
  }

  @Mutation(() => Project)
  async createProject(
    @Args() { name, shortText, description, initialTimeSpent }: CreateProjectInput,
    @Ctx() { user }: CustomContext
  ) {
    return ProjectRepository.createProject(name, shortText, description, initialTimeSpent, user);
  }

  @Mutation(() => Project)
  @Authorized([ROLE_ADMIN])
  async deleteProject(@Arg('id') id: number) {
    return ProjectRepository.deleteProject(id);
  }

  @Mutation(() => Project)
  async updateProject(
    @Args() { id, name, shortText, description, initialTimeSpent }: UpdateProjectInput
  ) {
    const project = await Project.findOneOrFail({ id }, { relations: ['languages','createdBy', 'tasks', 'status'] })
    return project.update(name, shortText, description, initialTimeSpent);
  }

  @Mutation(() => Project)
  async updateProjectLanguages(
    @Args() { id, languagesId }: UpdateProjectLanguageInput
  ) {
    return ProjectRepository.updateLanguage(id, languagesId);
  }

  @Mutation(() => Project)
  async updateProjectStatus(
    @Args() { id, statusId }: UpdateProjectStatusInput
  ) {
    const project = await Project.findOneOrFail({ id }, { relations: ['languages','createdBy', 'tasks', 'status'] })
    const status = await Status.findOneOrFail(statusId)
    return project.updateStatus(status);
  }

}

export default ProjectResolver
