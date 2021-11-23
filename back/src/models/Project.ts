import { Field, ID, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import User from './User'

@Entity()
@ObjectType()
class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number

  @Column('varchar', { length: 255 })
  @Field()
  name!: string

  @Column('varchar', { length: 255 })
  @Field()
  shortText!: string

  @Column('text')
  @Field()
  description!: string

  @Column()
  @Field()
  initialTimeSpent!: number

  @Column()
  @Field()
  createdAt!: Date

  @Column()
  @Field()
  updatedAt!: Date

  @ManyToOne(() => User, user => user.comments)
  @Field(() => User)
  manager!: User
}

export default Project
