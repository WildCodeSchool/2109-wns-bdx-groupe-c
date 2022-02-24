import Task from '../models/Task';
import Project from '../models/Project';
import User from '../models/AppUser';
import Status from '../models/Status';
import Comment from '../models/Comment';

export const taskGenetor = async (
  subject: string,
  shortText: string,
  description: string,
  projectID: number,
  status?: Status,
  assignee? : User,
  comments?: Comment[],
  ) => {
  const taskTest = new Task();
  taskTest.subject = subject;
  taskTest.shortText = shortText;
  taskTest.description = description;
  taskTest.project = await Project.findOneOrFail({id: projectID});
  taskTest.createdAt = new Date('2021-11-23T23:18:00.134Z');
  taskTest.updatedAt = new Date('2021-11-23T23:18:00.134Z');
  taskTest.dueDate = new Date('2021-11-23T23:18:00.134Z');
  taskTest.expectedDuration = 100;
  taskTest.spentTime = 0;
  if(assignee) taskTest.assignee = assignee;
  if(status) taskTest.status = status;
  if(comments) taskTest.comments = comments;
  return await taskTest.save();
}