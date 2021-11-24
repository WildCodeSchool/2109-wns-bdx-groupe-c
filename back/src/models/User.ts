import { Field, ID, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

import Comment from './Comment'
import Project from './Project'
import Role from './Role'

@Entity()
@ObjectType()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number

  @Column()
  @Field()
  firstName!: string

  @Column()
  @Field()
  lastName!: string

  @Column()
  @Field()
  email!: string

  @Column()
  @Field()
  password!: string

  @Column()
  @Field()
  isActive!: boolean

  @Column()
  @Field()
  createdAt!: Date

  @Column()
  @Field()
  updatedAt!: Date

  @ManyToOne(() => Role)
  @Field(() => Role)
  role!: Role

  @OneToMany(() => Comment, comment => comment.user)
  @Field(() => [Comment])
  comments!: Comment[]

  @OneToMany(() => Project, project => project.manager)
  @Field(() => [Project])
  projects!: Project[]
}

export default User
