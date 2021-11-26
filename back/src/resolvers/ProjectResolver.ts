import { Arg, Args, ArgsType, Field, Int, Mutation, Query, Resolver } from 'type-graphql'

import Project from '../models/Project'
import Language from '../models/Language'
import User from '../models/User'

@ArgsType()
class CreateProjectInput {
  @Field()
  name!: string

  @Field()
  shortText!: string

  @Field()
  description!: string
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
  initialTimeSpent?: string
}

@ArgsType()
class UpdateProjectLanguageInput {
  @Field(() => Int)
  id!: number

  @Field(() => [Int])
  languagesId!: number[]
}

@ArgsType()
class UpdateProjectManagerInput {
  @Field(() => Int)
  id!: number

  @Field(() => Int)
  userId!: number
}

@Resolver(Project)
class ProjectResolver {
  @Query(() => [Project])
  async project() {
    const projects = await Project.find({ relations: ['languages', 'manager'] })
    return projects
  }
  @Mutation(() => Project)
  async createProject(@Args() { name, shortText, description }: CreateProjectInput) {
    const project = new Project()
    project.name = name
    project.shortText = shortText
    project.description = description
    project.initialTimeSpent = 0
    project.createdAt = new Date()
    project.updatedAt = new Date()
    await project.save()
    return Project.findOne({ id: project.id }, { relations: ['languages','manager'] })
  }

  @Mutation(() => Project)
  async deleteProject(@Arg('id') id: number) {
    const project = await Project.findOneOrFail({ id })
    const projectSelected = { ...project }
    await Project.remove(project)
    return projectSelected
  }

  @Mutation(() => Project)
  async updateProject(
    @Args() { id, name, shortText, description, initialTimeSpent }: UpdateProjectInput
  ) {
    const project = await Project.findOneOrFail({ id })
    const updatedProperty: any = {}
    if (name) updatedProperty['name'] = name
    if (shortText) updatedProperty['shortText'] = shortText
    if (description) updatedProperty['description'] = description
    if (initialTimeSpent) updatedProperty['initialTimeSpent'] = initialTimeSpent
    updatedProperty['updatedAt'] = new Date()
    await Project.update(project, updatedProperty)
    const updatedProject = await Project.findOneOrFail({ id }, { relations: ['languages','manager'] })
    return updatedProject
  }

  @Mutation(() => Project)
  async updateProjectLanguage(
    @Args() { id, languagesId }: UpdateProjectLanguageInput
  ) {
    const project = await Project.findOneOrFail({ id }, { relations: ['languages','manager'] })
    const languages = await Language.findByIds(languagesId)
    project.languages = languages;
    await project.save();
    const updatedProject = await Project.findOneOrFail({ id }, { relations: ['languages','manager'] });
    return updatedProject
  }

  @Mutation(() => Project)
  async updateProjectManager(
    @Args() { id, userId }: UpdateProjectManagerInput
  ) {
    const project = await Project.findOneOrFail({ id }, { relations: ['languages','manager'] })
    const user = await User.findOneOrFail({ id: userId })
    project.manager = user;
    await project.save();
    const updatedProject = await Project.findOneOrFail({ id }, { relations: ['languages','manager'] });
    return updatedProject
  }


}

export default ProjectResolver
