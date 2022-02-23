import { Args, ArgsType, Field, Query, Resolver, Int, Mutation } from 'type-graphql'

import User from '../models/AppUser';
import UserLanguage from '../models/UserLanguage';


@ArgsType()
class myLanguagesInput {
  @Field(() => Int)
  userId!: number
}


@Resolver(UserLanguage)
class UserLanguageResolver {

  @Query(() => [UserLanguage])
  async myLanguages(@Args() { userId }: myLanguagesInput) {
    const user = await User.findOne({ id: userId })
    const myLanguages = await UserLanguage.find({
      relations: ['user', 'language'],
      where: {
        user: user
      }
    })
    return myLanguages
  }

}

export default UserLanguageResolver
