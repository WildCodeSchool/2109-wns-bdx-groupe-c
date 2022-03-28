import { Args, Arg, ArgsType, Field, Int, Mutation, Query, Resolver } from 'type-graphql'
import Task from '../models/Task'
import TaskRepository from '../repository/TaskRepository';
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

  @Field(() => String, { nullable: true })
  statusName?: string
}

@ArgsType()
class TaskByStatusInput {
  @Field(() => String)
  statusName!: string
}

@ArgsType()
class updateTask {
  @Field(() => Int)
  id!: number

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => String, { nullable: true })
  shortText?: string

  @Field(() => String, { nullable: true })
  subject?: string

  @Field({ nullable: true })
  expectedDuration?: number

  @Field(() => Date, { nullable: true })
  dueDate?: Date
}

@Resolver(Task)
class TaskResolver {
  @Query(() => [Task])
  async tasks(@Arg('projectId') projectId: number) {
    return TaskRepository.findByProjectId(projectId);
  }

  @Query(() => [Task])
  async myTasks(@Args() { userId, statusName }: MyTaskInput) {
    if (statusName) {
      return TaskRepository.findByUserIdAndStatus(userId,statusName);
    } else {
      return TaskRepository.findByUserId(userId);
    }
  }

  @Query(() => [Task])
  async allTasks() {
    return TaskRepository.findAll();
  }

  @Query(() => [Task])
  async tasksByStatus(@Args() { statusName }: TaskByStatusInput) {
    return TaskRepository.findByStatus(statusName);
  }

  @Query(() => Task)
  async task(@Arg('id') id: number) {
    return TaskRepository.findOneById(id);
  }

  @Mutation(() => Task)
  async createTask(
    @Args() { subject, shortText, description, projectId, dueDate, expectedDuration }: CreateTaskInput
  ) {
    return TaskRepository.createTask(subject, shortText, description, projectId, dueDate, expectedDuration);
  }

  @Mutation(() => Task)
  async assignUserToTask(
    @Args() { id, userId }: assignUserInput
  ) {
    const task = await Task.findOneOrFail({ id: id }, { relations: ['assignee', 'project', 'status','comments'] })
    return task.assignUser(userId);
  }

  @Mutation(() => Task)
  async updateTask(
    @Args() { id, description, shortText, subject, expectedDuration, dueDate }: updateTask
  ) {
    const task = await Task.findOneOrFail({ id: id }, { relations: ['assignee', 'project', 'status','comments'] })
    return task.updateTask(description, shortText, subject, expectedDuration, dueDate)
  }

  @Mutation(() => Task)
  async updateStatus(
    @Args() { id, statusId }: updateStatusInput
  ) {
    const task = await Task.findOneOrFail({ id: id }, { relations: ['assignee', 'project', 'status','comments'] })
    return task.updateStatus(statusId);
  }

  @Mutation(() => Task)
  async updateTimeSpent(
    @Args() { id, spentTime }: updateTimeSpentInput
  ) {
    const task = await Task.findOneOrFail({ id: id }, { relations: ['assignee', 'project', 'status','comments'] })
    return task.updateTimeSpent(spentTime);
  }


  @Mutation(() => Task)
  async deleteTask(@Arg('id') id: number) {
    return TaskRepository.deleteTask(id);
  }

}

export default TaskResolver
