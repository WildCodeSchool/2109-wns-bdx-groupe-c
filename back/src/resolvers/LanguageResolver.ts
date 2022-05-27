import { Arg, Args, ArgsType, Field, Int, Mutation, Query, Resolver } from 'type-graphql'
import Language from '../models/Language'
import LanguageRepository from '../repository/LanguageRepository'
import { MaxLength, IsNotEmpty, MinLength } from "class-validator";

@ArgsType()
class DeleteLanguageInput {
  @Field(() => Int)
  id!: number
}

@ArgsType()
class UpdateLangugeInput {
  @Field(() => Int)
  id!: number

  @Field()
  @MaxLength(100, {
    message: 'name is too long',
  })
  @MinLength(2, {
    message: 'name is too short',
  })
  @IsNotEmpty({ message : 'This field can\'t be empty'})
  name!: string
}

@Resolver(Language)
class LanguageResolver {
  @Query(() => [Language])
  async languages() {
    return LanguageRepository.findAll();
  }
  @Mutation(() => Language)
  async createLanguage(@Arg('name') name: string) {
    return LanguageRepository.createLanguage(name);
  }
  @Mutation(() => Language)
  async deleteLanguage(@Args() { id }: DeleteLanguageInput) {
    return LanguageRepository.deleteLanguage(id);
  }
  @Mutation(() => Language)
  async updateLanguage(@Args() { id, name }: UpdateLangugeInput) {
    const language = await Language.findOneOrFail({ id })
    return language.update(name);
  }
}

export default LanguageResolver