import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql'
import Role from '../models/Role'

@Resolver(Role)
class RoleResolver {
  @Query(() => [Role])
  async role() {
    const role = await Role.find()
    return role
  }
  @Mutation(() => Role)
  async createRole(@Arg('name') name: string) {
    const role = new Role()
    role.name = name
    await role.save()
    return role
  }
}

export default RoleResolver
