import { Arg, Args, ArgsType, Field, Int, Mutation, Query, Resolver } from "type-graphql";


import Status from "../models/Status";


@ArgsType()
class UpdateStatusInput {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;
}

@Resolver(Status)
class StatusResolver {
  @Query(() => [Status])
  async status() {
    const status = await Status.find();
    return status;
  }
  @Mutation(()=>Status)
  async createStatus(@Arg("name") name:string) {
    const status = new Status();
    status.name = name;
    await status.save();
    return status;
  }
  @Mutation(()=>Status)
  async deleteStatus(@Arg("id") id:number) {
    const status = await Status.findOneOrFail({id});
    await Status.remove(status);
    return status;
  }
  @Mutation(()=>Status)
  async updateStatusName(@Args(){id, name}:UpdateStatusInput) {
    const status = await Status.findOneOrFail({id});
    await Status.update(status, {name});
    const updatedStatus = await Status.findOneOrFail({id})
    return updatedStatus;
  }

}

export default StatusResolver;
