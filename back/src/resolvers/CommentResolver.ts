import { Arg, Args, ArgsType, Mutation, Query, Resolver, Field, Int } from 'type-graphql'
import Comment from '../models/Comment'
import User from '../models/AppUser'
import Task from '../models/Task'
@ArgsType()
class CreateCommentInput {
  @Field()
  content!: string

  @Field(() => Int)
  userId!: number

  @Field(() => Int)
  taskId!: number
}
@ArgsType()
class UpdateCommentInput {
  @Field(() => Int)
  id!: number

  @Field()
  content!: string
}
@Resolver(Comment)
class CommentResolver {
  @Query(() => [Comment])
  async comments() {
    return await Comment.find({ relations: ['user', 'task'] })
  }

  @Mutation(() => Comment)
  async createComment(@Args() { content, userId, taskId }: CreateCommentInput) {
    const comment = new Comment()
    const user = await User.findOneOrFail({ id: userId })
    const task = await Task.findOneOrFail({ id: taskId })

    comment.content = content
    comment.createdAt = new Date()
    comment.updatedAt = new Date()
    comment.user = user
    comment.task = task

    await comment.save()
    return Comment.findOne({ id: comment.id }, { relations: ['user', 'task'] })
  }

  @Mutation(() => Comment)
  async deleteComment(@Arg('id') id: number) {
    const comment = await Comment.findOneOrFail({ id })
    const commentSelected = { ...comment }
    await Comment.remove(comment)
    return commentSelected
  }
  @Mutation(() => Comment)
  async updateComment(@Args() { id, content }: UpdateCommentInput) {
    const comment = await Comment.findOneOrFail({ id })
    const updatedAt = new Date()
    comment.content = content
    comment.updatedAt = updatedAt
    await comment.save()
    return await Comment.findOneOrFail({ id }, { relations: ['user', 'task'] })
  }
}

export default CommentResolver
