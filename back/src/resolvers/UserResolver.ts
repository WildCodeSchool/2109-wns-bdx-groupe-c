import { Args, Arg, ArgsType, Field, Int, Mutation, Query, Resolver } from 'type-graphql'
import User from '../models/User'
import Role from '../models/Role'

const argon2 = require('argon2');

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1
};

const hashPassword = (password: string) => {
  return argon2.hash(password, hashingOptions);
};

const verifyPassword = (password: string, hashedPassword: string) => {
  return argon2.verify(password, hashedPassword, hashingOptions);
};

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

@Resolver(User)
class UserResolver {
  @Query(() => [User])
  async users() {
    const users = await User.find({ relations: ['projectsCreated','comments','role','tasks'] })
    return users
  }

  @Query(() => User)
  async user(@Arg('id') id: number) {
    const user = await User.findOneOrFail({ id })
    return user
  }

  @Mutation(() => User)
  async createUser(@Args() { firstName, lastName, email, password }: CreateUserInput) {
    const user = new User()
    user.firstName = firstName
    user.lastName = lastName
    user.email = email
    user.password = await hashPassword(password)
    user.isActive = true
    user.createdAt = new Date();
    user.updatedAt = new Date();
    await user.save()
    return User.findOne({ id: user.id }, { relations: ['projectsCreated','comments','role','tasks'] })
  }

  @Mutation(() => User)
  async deleteUser(@Args() { id }: DeleteUserInput) {
    const user = await User.findOneOrFail({ id })
    await User.update(user, { firstName: '', lastName: '', email: '', isActive: false, updatedAt: new Date() })
    return User.findOne({ id: user.id }, { relations: ['projectsCreated','comments','role','tasks'] })
  }

  @Mutation(() => User)
  async updateRole(@Args() { userId, roleIdentifier }: UpdateRoleInput) {
    const user = await User.findOneOrFail( userId )
    const role = await Role.findOneOrFail({ identifier: roleIdentifier })
    await User.update(user, { role, updatedAt: new Date() })
    return User.findOne({ id: userId }, { relations: ['projectsCreated','comments','role','tasks'] })
  }

  @Mutation(() => User)
  async updateUser(@Args() { id, firstName, lastName, email, password }: UpdateUserInput) {
    const user = await User.findOneOrFail({ id })
    const updatedProperty: any = {}
    if (firstName) updatedProperty['firstName'] = firstName
    if (lastName) updatedProperty['lastName'] = lastName
    if (email) updatedProperty['email'] = email
    if (password) updatedProperty['password'] = await hashPassword(password)
    updatedProperty['updatedAt'] = new Date()
    await User.update(user, updatedProperty)
    return User.findOne({ id: user.id }, { relations: ['projectsCreated','comments','role','tasks'] })
  }
}

export default UserResolver
