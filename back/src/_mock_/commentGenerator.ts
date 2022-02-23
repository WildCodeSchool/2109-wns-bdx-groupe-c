import Comment from '../models/Comment';
import User from '../models/AppUser';
import Task from '../models/Task';

export const commentGenerator = async (content: string, userId: number, taskId:number) => {
  const commentTest = new Comment();
  commentTest.content = content;
  commentTest.user = await User.findOneOrFail({id: userId});
  commentTest.task = await Task.findOneOrFail({id: taskId});
  commentTest.createdAt = new Date('2021-11-23T23:18:00.134Z');
  commentTest.updatedAt = new Date('2021-11-23T23:18:00.134Z');
  return await commentTest.save();
}