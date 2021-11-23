import { Arg, Args, ArgsType, Field, Int, Mutation, Query, Resolver } from 'type-graphql'

import Project from '../models/Project'

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

  @Field({ nullable: true })
  languageName?: string
}

@Resolver(Project)
class ProjectResolver {
  @Query(() => [Project])
  async project() {
    const projects = await Project.find()
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
    return project
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
    @Args() { id, name, shortText, description, initialTimeSpent, languageName }: UpdateProjectInput
  ) {
    const project = await Project.findOneOrFail({ id })
    const updatedProperty: any = {}
    if (name) updatedProperty['name'] = name
    if (shortText) updatedProperty['shortText'] = shortText
    if (description) updatedProperty['description'] = description
    if (initialTimeSpent) updatedProperty['initialTimeSpent'] = initialTimeSpent
    if (initialTimeSpent) {
      const language = await Project.findOne({ name: languageName })
      updatedProperty['language'] = language
    }
    updatedProperty['updatedAt'] = new Date()
    await Project.update(project, updatedProperty)
    const updatedProject = await Project.findOneOrFail({ id })
    return updatedProject
  }
}

export default ProjectResolver
