import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
class UpdateStatusInput {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;
}

export default UpdateStatusInput;