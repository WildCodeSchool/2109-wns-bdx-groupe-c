import { Args, ArgsType, Field, Query, Resolver, Int, Mutation } from 'type-graphql'

import User from '../models/AppUser';
import Language from '../models/Language';
import UserLanguage from '../models/UserLanguage';

import UserLanguageRepository from '../repository/UserLanguageRepository';
@ArgsType()
class myLanguagesInput {
  @Field(() => Int)
  userId!: number
}

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
  userId!: number

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
  async myLanguages(@Args() { userId }: myLanguagesInput) {
    return UserLanguageRepository.findAll(userId);
  }

  @Mutation(() => UserLanguage)
  async updateRatingLanguage(@Args() { userLanguageId, rating }: updateLanguageInput) {
    const userLanguage = await UserLanguage.findOneOrFail({ id: userLanguageId })
    return userLanguage.update(rating);
  }

  @Mutation(() => UserLanguage)
  async addLanguageToUser(@Args() { userId, rating, languageId }: addLanguageToUserInput) {
    return UserLanguageRepository.addLanguageToUser(userId, rating, languageId);
  }

  @Mutation(() => UserLanguage)
  async deleteLanguageFromUser(@Args() { userLanguageId }: deleteLanguageFromUserInput) {
    return UserLanguageRepository.deleteUserLanguage(userLanguageId);
  }

}

export default UserLanguageResolver
