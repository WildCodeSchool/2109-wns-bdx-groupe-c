import { Args, Arg, ArgsType, Field, Int, Mutation, Query, Resolver, Ctx, Authorized } from 'type-graphql'
import { CustomContext } from "../type";
import User from '../models/AppUser'
import Role from '../models/Role'
import UserRepository from '../repository/UserRepository';
import { ROLE_ADMIN } from '../constants';
import { MaxLength, IsEmail, MinLength } from "class-validator";

@ArgsType()
class signUpInput {
  @Field()
  @MaxLength(100, {
    message: 'FirstName is too long',
  })
  @MinLength(2, {
    message: 'FirstName is too short',
  })
  firstName!: string

  @Field()
  @MaxLength(100, {
    message: 'Lastname is too long',
  })
  @MinLength(2, {
    message: 'Lastname is too short',
  })
  lastName!: string

  @Field()
  @MinLength(4, {
    message: 'Password is too short',
  })
  password!: string

  @Field()
  @MaxLength(100, {
    message: 'Email is too long',
  })
  @IsEmail()
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
  @MaxLength(100, {
    message: 'FirstName is too long',
  })
  @MinLength(2, {
    message: 'FirstName is too short',
  })
  firstName?: string

  @Field({ nullable: true })
  @MaxLength(100, {
    message: 'Lastname is too long',
  })
  @MinLength(2, {
    message: 'Lastname is too short',
  })
  lastName?: string

  @Field({ nullable: true })
  @IsEmail()
  email?: string

  @Field({ nullable: true })
  @MinLength(4, {
    message: 'Password is too short',
  })
  password?: string
}

@ArgsType()
class UpdateUserInformationInput {
  @Field({ nullable: true })
  @MaxLength(100, {
    message: 'FirstName is too long',
  })
  @MinLength(2, {
    message: 'FirstName is too short',
  })
  firstName?: string

  @Field({ nullable: true })
  @MaxLength(100, {
    message: 'Lastname is too long',
  })
  @MinLength(2, {
    message: 'Lastname is too short',
  })
  lastName?: string

  @Field({ nullable: true })
  @IsEmail()
  email?: string

  @Field({ nullable: true })
  @MinLength(4, {
    message: 'Password is too short',
  })
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
  @Authorized([ROLE_ADMIN])
  async deleteUser(@Args() { id }: DeleteUserInput) {
    return UserRepository.deleteUser(id);
  }

  @Mutation(() => User)
  @Authorized([ROLE_ADMIN])
  async updateUserRole(@Args() { userId, roleIdentifier }: UpdateRoleInput) {
    const user = await User.findOneOrFail( userId )
    const role = await Role.findOneOrFail({ identifier: roleIdentifier })
    return user.updateUserRole(role);
  }

  @Mutation(() => User)
  async updateMyInformations(
    @Args() { firstName, lastName, email, password }: UpdateUserInformationInput,
    @Ctx() { user }: CustomContext
  ) {
    return UserRepository.updateMyInformations(user, firstName, lastName, email, password);
  }
}

export default UserResolver
