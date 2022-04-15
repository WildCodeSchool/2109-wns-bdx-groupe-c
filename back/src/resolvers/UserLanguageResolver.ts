import { Args, ArgsType, Field, Query, Resolver, Int, Mutation, Ctx } from 'type-graphql'
import { CustomContext } from "../type";
import UserLanguage from '../models/UserLanguage';

import UserLanguageRepository from '../repository/UserLanguageRepository';

@ArgsType()
class updateLanguageInput {
  @Field(() => Int)
  userLanguageId!: number

  @Field()
  rating!: number
}

@ArgsType()
class addLanguageToUserInput {
  @Field(() => Int)
  languageId!: number

  @Field()
  rating!: number
}

@ArgsType()
class deleteLanguageFromUserInput {
  @Field(() => Int)
  userLanguageId!: number
}



@Resolver(UserLanguage)
class UserLanguageResolver {

  @Query(() => [UserLanguage])
  async myLanguages(@Ctx() { user }: CustomContext) {
    return UserLanguageRepository.findAll(user);
  }

  @Mutation(() => UserLanguage)
  async updateRatingLanguage(@Args() { userLanguageId, rating }: updateLanguageInput) {
    const userLanguage = await UserLanguage.findOneOrFail({ id: userLanguageId })
    return userLanguage.update(rating);
  }

  @Mutation(() => UserLanguage)
  async addLanguageToMe(
    @Args() { rating, languageId }: addLanguageToUserInput,
    @Ctx() { user }: CustomContext
  ) {
    return UserLanguageRepository.addLanguageToUser(user, rating, languageId);
  }

  @Mutation(() => UserLanguage)
  async deleteLanguageFromUser(@Args() { userLanguageId }: deleteLanguageFromUserInput) {
    return UserLanguageRepository.deleteUserLanguage(userLanguageId);
  }

}

export default UserLanguageResolver
