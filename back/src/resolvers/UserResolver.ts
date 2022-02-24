import { Args, Arg, ArgsType, Field, Int, Mutation, Query, Resolver } from 'type-graphql'
import User from '../models/AppUser'
import Role from '../models/Role'
import UserRepository from '../repository/UserRepository';

@ArgsType()
class CreateUserInput {
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

  @Query(() => User)
  async user(@Arg('id') id: number) {
    return UserRepository.findOneById(id);
  }

  @Mutation(() => User)
  async createUser(@Args() { firstName, lastName, email, password }: CreateUserInput) {
    return UserRepository.createUser(firstName, lastName, email, password);
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
