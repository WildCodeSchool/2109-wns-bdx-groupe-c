import { Args, Arg, ArgsType, Field, Int, Mutation, Query, Resolver, Ctx } from 'type-graphql'
import { CustomContext } from "../type";
import User from '../models/AppUser'
import Role from '../models/Role'
import UserRepository from '../repository/UserRepository';

@ArgsType()
class signUpInput {
  @Field()
  firstName!: string

  @Field()
  lastName!: string

  @Field()
  password!: string

  @Field()
  email!: string
}

@ArgsType()
class signInInput {
  @Field()
  email!: string

  @Field()
  password!: string
}

@ArgsType()
class DeleteUserInput {
  @Field(() => Int)
  id!: number
}

@ArgsType()
class UpdateRoleInput {
  @Field(() => Int)
  userId!: number

  @Field()
  roleIdentifier!: string
}

@ArgsType()
class UpdateUserInput {
  @Field(() => Int)
  id!: number

  @Field({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  lastName?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  password?: string
}

@ArgsType()
class UpdateUserInformationInput {
  @Field(() => Int)
  id!: number

  @Field({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  lastName?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  password?: string
}



@Resolver(User)
class UserResolver {
  @Query(() => [User])
  async users() {
    return UserRepository.findAll();
  }

  @Query(() => User, {nullable: true})
  async myProfile(@Ctx() { user }: CustomContext) {
    return user;
  }

  @Query(() => User)
  async user(@Arg('id') id: number) {
    return UserRepository.findOneById(id);
  }

  @Mutation(() => User)
  async signUp(@Args() { firstName, lastName, email, password }: signUpInput) {
    return UserRepository.signUp(firstName, lastName, email, password);
  }

  @Mutation(() => User)
  async signIn(
    @Args() { email, password }: signInInput,
    @Ctx() { onSessionCreated }: CustomContext
  ): Promise<User | undefined> {
    return UserRepository.signIn(email, password, onSessionCreated);
  }

  @Mutation(() => Boolean)
  async logOut(@Ctx() { sessionId }: CustomContext) {
    return UserRepository.logOut(sessionId);
  }

  @Mutation(() => User)
  async deleteUser(@Args() { id }: DeleteUserInput) {
    return UserRepository.deleteUser(id);
  }

  @Mutation(() => User)
  async updateUserRole(@Args() { userId, roleIdentifier }: UpdateRoleInput) {
    const user = await User.findOneOrFail( userId )
    const role = await Role.findOneOrFail({ identifier: roleIdentifier })
    return user.updateUserRole(role);
  }

  @Mutation(() => User)
  async updateUserInformation(@Args() { id, firstName, lastName, email, password }: UpdateUserInformationInput) {
    const user = await User.findOneOrFail( id )
    return user.updateInformation(firstName, lastName, email, password);
  }
}

export default UserResolver
