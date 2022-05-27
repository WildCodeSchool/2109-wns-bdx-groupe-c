import { Arg, Args, ArgsType, Mutation, Query, Resolver, Field, Int, Ctx } from 'type-graphql'
import { CustomContext } from "../type";
import Comment from '../models/Comment'
import CommentRepository from '../repository/CommentRepository'
import { IsNotEmpty, MinLength } from "class-validator";

@ArgsType()
class CreateCommentInput {
  @Field()
  @IsNotEmpty({ message : 'This field can\'t be empty'})
  @MinLength(2, {
    message: 'content is too short',
  })
  content!: string

  @Field(() => Int)
  taskId!: number
}
@ArgsType()
class UpdateCommentInput {
  @Field(() => Int)
  id!: number

  @Field()
  @IsNotEmpty({ message : 'This field can\'t be empty'})
  @MinLength(2, {
    message: 'content is too short',
  })
  content!: string
}
@Resolver(Comment)
class CommentResolver {
  @Query(() => [Comment])
  async comments(@Arg('taskId') taskId: number) {
    return CommentRepository.findAll(taskId);
  }

  @Mutation(() => Comment)
  async createComment(
    @Args() { content, taskId }: CreateCommentInput,
    @Ctx() { user }: CustomContext
  ) {
    return await CommentRepository.createComment(content, user, taskId)
  }

  @Mutation(() => Comment)
  async deleteComment(@Arg('id') id: number) {
    return await CommentRepository.deleteComment(id)
  }

  @Mutation(() => Comment)
  async updateComment(@Args() { id, content }: UpdateCommentInput) {
    const comment = await Comment.findOneOrFail({ id })
    return comment.update(content);
  }
}

export default CommentResolver
