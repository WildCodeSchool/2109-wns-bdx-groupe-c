import { Arg, Args, ArgsType, Field, Int, Mutation, Query, Resolver } from "type-graphql";
import { MaxLength, IsNotEmpty, MinLength } from "class-validator";

import Status from "../models/Status";
import StatusRepository from "../repository/StatusRepository";

@ArgsType()
class UpdateStatusInput {
  @Field(() => Int)
  id!: number

  @Field()
  @MaxLength(150, {
    message: 'identifier is too long',
  })
  @MinLength(2, {
    message: 'name is too short',
  })
  @IsNotEmpty({ message : 'identifier can\'t be empty'})
  name!: string
}

@ArgsType()
class taskByStatusByProjectInput {
  @Field(() => Int)
  projectId!: number
}

@Resolver(Status)
class StatusResolver {
  @Query(() => [Status])
  async status() {
    return StatusRepository.findAll();
  }
  @Query(() => [Status])
  async taskByStatusByProject(@Args() { projectId }: taskByStatusByProjectInput) {
    return StatusRepository.findTaskByStatusByProject(projectId);
  }
  @Mutation(()=>Status)
  async createStatus(@Arg("name") name:string) {
    return StatusRepository.createStatus(name);
  }
  @Mutation(()=>Status)
  async deleteStatus(@Arg("id") id:number) {
    return StatusRepository.deleteStatus(id);
  }
  @Mutation(() => Status)
  async updateStatusName(@Args() { id, name }: UpdateStatusInput) {
    const status = await Status.findOneOrFail({ id })
    return status.update(name);
  }
}

export default StatusResolver
