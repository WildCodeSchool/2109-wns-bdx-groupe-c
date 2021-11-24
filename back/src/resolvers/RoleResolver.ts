import { Args, ArgsType, Field, Int, Mutation, Query, Resolver } from 'type-graphql'
import Role from '../models/Role'

@ArgsType()
class CreateRoleInput {
  @Field()
  name!: string

  @Field()
  identifier!: string
}

@Resolver(Role)
class RoleResolver {
  @Query(() => [Role])
  async role() {
    const role = await Role.find()
    return role
  }
  @Mutation(() => Role)
  async createRole(@Args() { name, identifier }: CreateRoleInput) {
    const role = new Role()
    role.name = name
    role.identifier = identifier
    await role.save()
    return role
  }
}

export default RoleResolver
