import { Field, ID, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import User from './User'
import Role from './Role'
import Project from './Project'

@Entity()
@ObjectType()
class UserProject extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number

  @ManyToOne(() => User)
  @Field(() => User)
  user!: User

  @ManyToOne(() => Project)
  @Field(() => Project)
  project!: Project

  @ManyToOne(() => Role)
  @Field(() => Role)
  role!: Role
}

export default UserProject
