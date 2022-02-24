import Task from '../models/Task'
import Project from '../models/Project'
import User from '../models/AppUser'
import Status from '../models/Status'

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
    })
  }

  static async findByUserId(userId: number) {
    return await Task.find({
      relations: ['assignee', 'project', 'status','comments'],
      where: {
        assignee: { id: userId },
      },
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
    const taskCopy = { ...task };
    await Task.remove(task)
    return taskCopy
  }



}

export default TaskRepository