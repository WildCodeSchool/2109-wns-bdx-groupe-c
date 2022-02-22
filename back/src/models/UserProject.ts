import { Field, ID, ObjectType } from 'type-graphql'
import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import User from './User'
import Project from './Project'
import ProjectRole from './ProjectRole'

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

  @ManyToOne(() => ProjectRole)
  @Field(() => ProjectRole)
  projectRole!: ProjectRole
}

export default UserProject
