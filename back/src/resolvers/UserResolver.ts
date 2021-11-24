import { Args, ArgsType, Field, Int, Mutation, Query, Resolver } from 'type-graphql'
import User from '../models/User'
import Role from '../models/Role'
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

@Resolver(User)
class UserResolver {
  @Query(() => [User])
  async users() {
    const users = await User.find({ relations: ['projects','comments','role'] })
    return users
  }

  @Mutation(() => User)
  async createUser(@Args() { firstName, lastName, email, password }: CreateUserInput) {
    const user = new User()
    user.firstName = firstName
    user.lastName = lastName
    user.email = email
    user.password = password
    user.isActive = true
    user.createdAt = new Date();
    user.updatedAt = new Date();
    const roleUser = await Role.findOneOrFail({ identifier: 'user' });
    user.role = roleUser;
    await user.save()
    return User.findOne({ id: user.id }, { relations: ['projects','comments','role'] })
  }

  @Mutation(() => User)
  async deleteUser(@Args() { id }: DeleteUserInput) {
    const user = await User.findOneOrFail({ id })
    await User.update(user, { firstName: '', lastName: '', email: '', isActive: false, updatedAt: new Date() })
    const updatedUser = await User.findOne({ id })
    return updatedUser
  }

  @Mutation(() => User)
  async updateUser(@Args() { id, firstName, lastName, email, password  }: UpdateUserInput) {
    const user = await User.findOneOrFail({ id })
    const updatedProperty: any = {}
    if (firstName) updatedProperty['firstName'] = firstName
    if (lastName) updatedProperty['lastName'] = lastName
    if (email) updatedProperty['email'] = email
    if (password) updatedProperty['password'] = password
    updatedProperty['updatedAt'] = new Date()
    await User.update(user, updatedProperty)
    const updatedUser = await User.findOne({ id })
    return updatedUser
  }
}

export default UserResolver
