import { Args, ArgsType, Field, Int, Mutation, Query, Resolver } from 'type-graphql'
import Role from '../models/Role'

@ArgsType()
class CreateRoleInput {
  @Field(() => Int)
  id!: number

  @Field()
  name!: string

  @Field()
  identifier!: string
}

@ArgsType()
class DeleteRoleInput {
  @Field(() => Int)
  id!: number
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
  @Mutation(() => Role)
  async deleteRole(@Args() { id }: DeleteRoleInput) {
    const role = await Role.findOneOrFail({ id })
    await Role.remove(role)
    return role
  }
  @Mutation(() => Role)
  async updateRole(@Args() { id, name, identifier }: UpdateRoleInput) {
    const role = await Role.findOneOrFail({ id })
    await Role.update(role, { name, identifier })
    const updateRole = await Role.findOne({ id })
    return updateRole
  }
}

export default RoleResolver
