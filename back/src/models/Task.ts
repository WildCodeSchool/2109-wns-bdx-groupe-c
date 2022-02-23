import { Field, ID, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm'
import Project from './Project'
import Status from './Status'
import User from './AppUser'
import Comment from './Comment'

@Entity()
@ObjectType()
class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number

  @Column('varchar', { length: 255 })
  @Field()
  subject!: string

  @Column('varchar', { length: 255 })
  @Field()
  shortText!: string

  @Column('text')
  @Field()
  description!: string

  @ManyToOne(() => Status)
  @Field(() => Status, { nullable: true })
  status?: Status

  @ManyToOne(() => Project)
  @Field(() => Project)
  project!: Project

  @ManyToOne(() => User)
  @Field(() => User, { nullable: true })
  assignee?: User

  @CreateDateColumn()
  @Field()
  createdAt!: Date

  @CreateDateColumn()
  @Field()
  updatedAt!: Date

  @CreateDateColumn()
  @Field()
  dueDate!: Date

  @Column('int')
  @Field()
  expectedDuration!: number

  @Column('int')
  @Field()
  spentTime!: number

  @OneToMany(() => Comment, comment => comment.task)
  @Field(() => [Comment])
  comments!: Comment[]


}

export default Task
