import { Arg, Args, ArgsType, Field, Int, Mutation, Query, Resolver } from 'type-graphql'
import Language from '../models/Language'

@ArgsType()
class CreateLanguageInput {
  @Field(() => Int)
  id!: number

  @Field()
  name!: string
}

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
  name!: string
}

@Resolver(Language)
class LanguageResolver {
  @Query(() => [Language])
  async language() {
    const language = await Language.find()
    return language
  }
  @Mutation(() => Language)
  async createLanguage(@Arg('name') name: string) {
    const language = new Language()
    language.name = name
    await language.save()
    return language
  }
  @Mutation(() => Language)
  async deleteLanguage(@Args() { id }: DeleteLanguageInput) {
    const language = await Language.findOneOrFail({ id })
    await Language.remove(language)
    return language
  }
  @Mutation(() => Language)
  async updateLanguage(@Args() { id, name }: UpdateLangugeInput) {
    const language = await Language.findOneOrFail({ id })
    await Language.update(language, { name })
    const updateLanguage = await Language.findOne({ id })
    return updateLanguage
  }
}

export default LanguageResolver
