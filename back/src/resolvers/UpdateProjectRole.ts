import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
class UpdateProjectRoleInput {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;
}

export default UpdateProjectRoleInput;