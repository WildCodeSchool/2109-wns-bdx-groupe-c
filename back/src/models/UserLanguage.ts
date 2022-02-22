import { Field, ID, ObjectType  } from 'type-graphql'
import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm'
import User from './User'
import Language from './Language'

@Entity()
@ObjectType()
class UserLanguage extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number

  @Column('float')
  @Field({ nullable: true })
  rating?: number;

  @ManyToOne(() => User)
  @Field(() => User)
  user!: User

  @ManyToOne(() => Language)
  @Field(() => Language)
  language!: Language
}

export default UserLanguage
