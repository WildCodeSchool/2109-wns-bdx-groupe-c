import { Field, ID, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

import Comment from './Comment'
import Project from './Project'
import Role from './Role'
import Task from './Task'
@Entity()
@ObjectType()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number

  @Column('varchar', { length: 100 })
  @Field()
  firstName!: string

  @Column('varchar', { length: 100 })
  @Field()
  lastName!: string

  @Column('varchar', { length: 100 })
  @Field()
  email!: string

  @Column('varchar', { length: 255 })
  @Field()
  password!: string

  @Column('boolean', { default: true })
  @Field()
  isActive!: boolean

  @Column('datetime')
  @Field()
  createdAt!: Date

  @Column('datetime')
  @Field()
  updatedAt!: Date

  @ManyToOne(() => Role)
  @Field(() => Role, { nullable: true })
  role?: Role

  @OneToMany(() => Comment, comment => comment.user)
  @Field(() => [Comment])
  comments!: Comment[]

  @OneToMany(() => Project, project => project.createdBy)
  @Field(() => [Project])
  projectsCreated!: Project[]

  @OneToMany(() => Task, task => task.assignee)
  @Field(() => [Task])
  tasks?: Task[]
}

export default User
