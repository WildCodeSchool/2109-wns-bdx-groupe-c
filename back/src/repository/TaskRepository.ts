import Task from '../models/Task'
import User from '../models/AppUser';
import Project from '../models/Project'
import Status from '../models/Status'
import ObjectHelpers from '../helpers/ObjectHelper';

class TaskRepository extends Task {
  static async findAll() {
    return await Task.find({
      relations: ['assignee', 'project', 'status','comments'],
      order: {id: 'ASC'}
    });
  }

  static async findOneById(id: number) {
    return await Task.findOneOrFail({ id }, { relations: ['assignee', 'project', 'status','comments'] })
  }

  static async findByProjectId(projectId: number) {
    return await Task.find({
      relations: ['assignee', 'project', 'status','comments'],
      where: {
        project: { id: projectId },
      },
      order: {id: 'ASC'}
    })
  }

  static async findByUserIdAndStatus(user: User | null, statusName: string) {
    if (!user) {
      throw new Error('User is not logged in')
    }
    return await Task.find({
      relations: ['assignee', 'project', 'status','comments'],
      where: {
        assignee: user,
        status: { name: statusName },
      },
      order: {id: 'ASC'}
    })
  }

  static async findByUserId(user: User | null) {
    if (!user) {
      throw new Error('User is not logged in')
    }
    return await Task.find({
      relations: ['assignee', 'project', 'status','comments'],
      where: {
        assignee: user,
      },
      order: {id: 'ASC'}
    })
  }

  static async createTask(
    subject: string,
    shortText: string,
    description: string,
    projectId: number,
    dueDate: Date,
    expectedDuration: number
    ) {
      const task = new Task()
      const project = await Project.findOneOrFail({ id: projectId });
      const toDo = await Status.findOneOrFail({ name: 'To Do' });
      task.subject = subject
      task.shortText = shortText
      task.description = description
      task.project = project
      task.dueDate = dueDate
      task.expectedDuration = expectedDuration
      task.spentTime = 0
      task.createdAt = new Date()
      task.updatedAt = new Date()
      task.status = toDo;
      await task.save()
      return Task.findOne({ id: task.id }, { relations: ['assignee', 'project', 'status','comments'] })
    }

  static async deleteTask(id: number) {
    const task = await Task.findOneOrFail({ id }, { relations: ['assignee', 'project', 'status','comments'] })
    const taskCopy = ObjectHelpers.deepClone(task);
    await Task.remove(task)
    return taskCopy
  }

  static async findByStatus(statusName: string) {
    return await Task.find({
      relations: ['assignee', 'project', 'status','comments'],
      where: {
        status: { name: statusName },
      },
      order: {id: 'ASC'}
    });
  }



}

export default TaskRepository