import { Args, ArgsType, Field, Int, Mutation, Query, Resolver } from 'type-graphql'
import Role from '../models/Role'
import RoleRepository from '../repository/RoleRepository'

@ArgsType()
class CreateRoleInput {
  @Field()
  name!: string

  @Field()
  identifier!: string
}

@ArgsType()
class UpdateRoleInput {
  @Field(() => Int)
  id!: number

  @Field()
  name!: string

  @Field()
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
