import { Args, ArgsType, Field, Int, Mutation, Query, Resolver } from 'type-graphql'
import { MaxLength, IsNotEmpty, MinLength } from "class-validator";

import Role from '../models/Role'
import RoleRepository from '../repository/RoleRepository'

@ArgsType()
class CreateRoleInput {
  @Field()
  @MaxLength(100, {
    message: 'name is too long',
  })
  @IsNotEmpty({ message : 'name can\'t be empty'})
  @MinLength(2, {
    message: 'name is too short',
  })
  name!: string

  @Field()
  @MaxLength(100, {
    message: 'identifier is too long',
  })
  @IsNotEmpty({ message : 'identifier can\'t be empty'})
  @MinLength(2, {
    message: 'identifier is too short',
  })
  identifier!: string
}

@ArgsType()
class UpdateRoleInput {
  @Field(() => Int)
  id!: number

  @Field()
  @MaxLength(100, {
    message: 'name is too long',
  })
  @IsNotEmpty({ message : 'name can\'t be empty'})
  name!: string

  @Field()
  @MaxLength(100, {
    message: 'identifier is too long',
  })
  @IsNotEmpty({ message : 'identifier can\'t be empty'})
  identifier!: string
}

@Resolver(Role)
class RoleResolver {
  @Query(() => [Role])
  async roles() {
    return RoleRepository.findAll();
  }

  @Mutation(() => Role)
  async createRole(@Args() { name, identifier }: CreateRoleInput) {
    return RoleRepository.createRole(name, identifier);
  }

  @Mutation(() => Role)
  async updateRole(@Args() { id, name, identifier }: UpdateRoleInput) {
    const role = await Role.findOneOrFail({ id })
    return role.update(name, identifier);
  }
}

export default RoleResolver
