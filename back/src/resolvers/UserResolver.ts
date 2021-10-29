import { Args, ArgsType, Field, Int, Mutation, Query, Resolver } from "type-graphql";

import User from "../models/User";

@ArgsType()
class CreateUserInput {
  @Field()
  name!: string;

  @Field()
  email!: string;
}

@ArgsType()
class DeleteUserInput {
  @Field(() => Int)
  id!: number;
}


@ArgsType()
class UpdateUserInput {
  @Field(() => Int)
  id!: number;

  @Field({ nullable: true })
  name?: string;

}



@Resolver(User)
class UserResolver {
  @Query(() => [User])
  async users() {
    const users = await User.find();
    return users;
  }

  @Mutation(() => User)
  async createUser(@Args() { name, email }: CreateUserInput) {
    const user = new User();
    user.name = name;
    user.email = email;
    await user.save();
    return user;
  }

  @Mutation(() => User)
  async deleteUser(@Args() { id }: DeleteUserInput) {
    const user = await User.findOneOrFail({ id });
    await User.remove(user);
    return user;
  }

  @Mutation(() => User)
  async updateUser(@Args() { id, name }: UpdateUserInput) {
    const user = await User.findOneOrFail({ id });
    await User.update(user, { name });
    const updatedUser = await User.findOne({ id });
    return updatedUser;
  }
}

export default UserResolver;