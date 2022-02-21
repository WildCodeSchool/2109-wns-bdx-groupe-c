import { Args, ArgsType, Field, Query, Resolver, Int } from 'type-graphql'

import UserProject from '../models/UserProject'
import User from '../models/User';

@ArgsType()
class MyProjectsInput {
  @Field(() => Int)
  userId!: number
}

@Resolver(UserProject)
class UserProjectResolver {

  @Query(() => [UserProject])
  async myProjects(@Args() { userId }: MyProjectsInput) {
    const user = await User.findOne({ id: userId })
    const myProjects = await UserProject.find({
      relations: ['user', 'project', 'projectRole'],
      where: {
        user: user
      }
    })
    return myProjects
  }

}

export default UserProjectResolver
