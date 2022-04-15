import Comment from '../models/Comment'
import User from '../models/AppUser'
import Task from '../models/Task'
import ObjectHelpers from '../helpers/ObjectHelper'

class CommentRepository extends Comment {
  static async findAll(taskId: number) {
    return await Comment.find({ relations: ['user', 'task'], where:   { task: { id: taskId } } })
  }

  static async createComment(content: string, user: User | null, taskId: number) {
    if (!user) {
      throw new Error('User is not logged in')
    }
    const comment = new Comment()
    const task = await Task.findOneOrFail({ id: taskId })

    comment.content = content
    comment.createdAt = new Date()
    comment.updatedAt = new Date()
    comment.user = user
    comment.task = task
    await comment.save()

    return Comment.findOne({ id: comment.id }, { relations: ['user', 'task'] })
  }

  static async deleteComment(id: number) {
    const comment = await Comment.findOneOrFail({ id }, { relations: ['user', 'task'] })
    const commentCopy = ObjectHelpers.deepClone(comment);
    await Comment.remove(comment)
    return commentCopy
  }
}

export default CommentRepository