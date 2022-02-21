import { Args, Arg, ArgsType, Field, Int, Mutation, Query, Resolver } from 'type-graphql'
import Task from '../models/Task'
import Project from '../models/Project'
import User from '../models/User'
import Status from '../models/Status'

@ArgsType()
class CreateTaskInput {
  @Field()
  subject!: string

  @Field()
  shortText!: string

  @Field()
  description!: string

  @Field(() => Int)
  projectId!: number

  @Field()
  dueDate!: Date

  @Field(() => Int)
  expectedDuration!: number
}

@ArgsType()
class DeleteTaskInput {
  @Field(() => Int)
  id!: number
}

@ArgsType()
class assignUserInput {
  @Field(() => Int)
  id!: number

  @Field(() => Int)
  userId!: number
}

@ArgsType()
class updateStatusInput {
  @Field(() => Int)
  id!: number

  @Field(() => Int)
  statusId!: number
}

@ArgsType()
class updateTimeSpentInput {
  @Field(() => Int)
  id!: number

  @Field(() => Int)
  spentTime!: number
}

@ArgsType()
class MyTaskInput {
  @Field(() => Int)
  userId!: number
}

@ArgsType()
class updateTaskTextInput {
  @Field(() => Int)
  id!: number

  @Field()
  description?: string

  @Field()
  shortText?: string

  @Field()
  subject?: string
}

@Resolver(Task)
class TaskResolver {
  @Query(() => [Task])
  async tasks(@Arg('projectId') projectId: number) {
    const tasks = await Task.find({
      relations: ['assignee', 'project', 'status','comments'],
      where: {
        project: { id: projectId },
      },
    })
    return tasks
  }

  @Query(() => [Task])
  async myTasks(@Args() { userId }: MyTaskInput) {
    const tasks = await Task.find({
      relations: ['assignee', 'project', 'status','comments'],
      where: {
        assignee: { id: userId },
      },
    })
    return tasks
  }



  @Query(() => Task)
  async task(@Arg('id') id: number) {
    const task = await Task.findOneOrFail({ id })
    return task
  }

  @Mutation(() => Task)
  async createTask(
    @Args() { subject, shortText, description, projectId, dueDate, expectedDuration }: CreateTaskInput
  ) {
    const task = new Task()
    const project = await Project.findOneOrFail({ id: projectId })
    task.subject = subject
    task.shortText = shortText
    task.description = description
    task.project = project
    task.dueDate = dueDate
    task.expectedDuration = expectedDuration
    task.spentTime = 0
    task.createdAt = new Date()
    task.updatedAt = new Date()
    await task.save()
    return Task.findOne({ id: task.id }, { relations: ['assignee', 'project', 'status','comments'] })
  }

  @Mutation(() => Task)
  async assignUser(
    @Args() { id, userId }: assignUserInput
  ) {
    const task = await Task.findOneOrFail({ id: id }, { relations: ['assignee', 'project', 'status','comments'] })
    const assignee = await User.findOneOrFail({ id: userId })
    task.assignee = assignee
    task.updatedAt = new Date()
    await task.save()
    return Task.findOne({ id: task.id }, { relations: ['assignee', 'project', 'status','comments'] })
  }

  @Mutation(() => Task)
  async updateText(
    @Args() { id, description, shortText, subject }: updateTaskTextInput
  ) {
    const task = await Task.findOneOrFail({ id: id }, { relations: ['assignee', 'project', 'status','comments'] })
    const updatedProperty: any = {}
    if(description) updatedProperty.description = description
    if(shortText) updatedProperty.shortText = shortText
    if(subject) updatedProperty.subject = subject
    task.updatedAt = new Date()
    await Task.update(task, updatedProperty)
    return Task.findOne({ id: task.id }, { relations: ['assignee', 'project', 'status','comments'] })
  }

  @Mutation(() => Task)
  async updateStatus(
    @Args() { id, statusId }: updateStatusInput
  ) {
    const task = await Task.findOneOrFail({ id: id }, { relations: ['assignee', 'project', 'status','comments'] })
    const status = await Status.findOneOrFail({ id: statusId })
    task.status = status
    task.updatedAt = new Date()
    await task.save()
    return Task.findOne({ id: task.id }, { relations: ['assignee', 'project', 'status','comments'] })
  }

  @Mutation(() => Task)
  async updateTimeSpent(
    @Args() { id, spentTime }: updateTimeSpentInput
  ) {
    const task = await Task.findOneOrFail({ id: id }, { relations: ['assignee', 'project', 'status','comments'] })
    task.spentTime = task.spentTime + spentTime
    await task.save()
    return Task.findOne({ id: task.id }, { relations: ['assignee', 'project', 'status','comments'] })
  }


  @Mutation(() => Task)
  async deleteTask({ id }: DeleteTaskInput) {
    const task = await Task.findOneOrFail({ id }, { relations: ['assignee', 'project', 'status','comments'] })
    await Task.remove(task)
    return task
  }

}

export default TaskResolver
