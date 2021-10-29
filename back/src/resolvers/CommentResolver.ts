import { Arg, Args, ArgsType, Mutation, Query, Resolver, Field, Int } from "type-graphql";
import Comment from "../models/Comment";


@ArgsType()
class UpdateCommentInput {
  @Field(() => Int)
  id!: number;

  @Field()
  content!: string;
}




@Resolver(Comment)
class CommentResolver {
  @Query(() => [Comment])
  async comments() {
    const comments = await Comment.find();
    return comments;
  }
  @Mutation(()=>Comment)
  async createComment(@Arg("content") content:string) {
    const comment = new Comment();
    comment.content = content;
    comment.createdAt = new Date();
    comment.updatedAt = new Date();
    await comment.save();
    return comment;
  }
  @Mutation(()=>Comment)
  async deleteComment(@Arg("id") id:number) {
    const comment = await Comment.findOneOrFail({id});
    await Comment.remove(comment);
    return comment;
  }
  @Mutation(()=>Comment)
  async updateComment(@Args(){id, content}:UpdateCommentInput) {
    const comment = await Comment.findOneOrFail({id});
    const updatedAt = new Date()
    await Comment.update(comment, {content, updatedAt});
    const updatedProjectRole = await Comment.findOneOrFail({id})
    return updatedProjectRole;
  }

}

export default CommentResolver;