import { Arg, Args, ArgsType, Mutation, Query, Resolver, Field, Int } from 'type-graphql'
import Comment from '../models/Comment'
import User from '../models/User'

@ArgsType()
class CreateCommentInput {
  @Field()
  content!: string

  @Field(() => Int)
  userId!: number
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
    const comments = await Comment.find({ relations: ['user'] })
    return comments
  }
  @Mutation(() => Comment)
  async createComment(@Args() { content, userId }: CreateCommentInput) {
    const comment = new Comment()
    comment.content = content
    comment.createdAt = new Date()
    comment.updatedAt = new Date()
    const user = await User.findOneOrFail({ id: userId })
    comment.user = user
    await comment.save()
    return Comment.findOne({ id: comment.id }, { relations: ['user'] })
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
    await Comment.update(comment, { content, updatedAt })
    const updatedProjectRole = await Comment.findOneOrFail({ id }, { relations: ['user'] })
    return updatedProjectRole
  }
}

export default CommentResolver
