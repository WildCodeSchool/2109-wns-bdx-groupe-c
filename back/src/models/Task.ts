import { Field, ID, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm'
import { MaxLength, IsNotEmpty, IsDate, Min, IsInt } from "class-validator";

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
  @MaxLength(255, {
    message: 'subject is too long',
  })
  @IsNotEmpty({ message : 'subject can\'t be empty'})
  subject!: string

  @Column('varchar', { length: 255 })
  @Field()
  @MaxLength(255, {
    message: 'shortText is too long',
  })
  @IsNotEmpty({ message : 'shortText can\'t be empty'})
  shortText!: string

  @Column('text')
  @Field()
  @MaxLength(255, {
    message: 'description is too long',
  })
  @IsNotEmpty({ message : 'description can\'t be empty'})
  description!: string

  @ManyToOne(() => Status, status => status.tasks)
  @Field(() => Status, { nullable: true })
  status?: Status

  @ManyToOne(() => Project, project => project.tasks, { onDelete: 'CASCADE' })
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
  @IsDate()
  @IsNotEmpty({ message : 'dueDate can\'t be empty'})
  dueDate!: Date

  @Column('int')
  @Field()
  @IsInt()
  @Min(0)
  @IsNotEmpty({ message : 'expectedDuration can\'t be empty'})
  expectedDuration!: number

  @Column('int')
  @Field()
  @IsInt()
  @Min(0)
  @IsNotEmpty({ message : 'spentTime can\'t be empty'})
  spentTime!: number

  @OneToMany(() => Comment, comment => comment.task, { cascade: true })
  @Field(() => [Comment])
  comments!: Comment[]

  async assignUser(userId: number) {
    const assignee = await User.findOneOrFail({ id: userId })
    this.assignee = assignee
    this.updatedAt = new Date()
    await this.save()
    return this;
  }

  async updateTask(
    description: string | undefined,
    shortText: string | undefined,
    subject: string | undefined,
    expectedDuration: number | undefined,
    dueDate: Date | undefined
  ) {
    if(description) this.description = description
    if(shortText) this.shortText = shortText
    if(subject) this.subject = subject
    if(expectedDuration) this.expectedDuration = expectedDuration
    if(dueDate) this.dueDate = dueDate
    this.updatedAt = new Date()
    await this.save()
    return this;
  }

  async updateStatus(statusId: number) {
    const status = await Status.findOneOrFail({ id: statusId })
    this.status = status
    this.updatedAt = new Date()
    await this.save()
    return this;
  }

  async updateTimeSpent(spentTime: number) {
    this.spentTime += spentTime;
    this.updatedAt = new Date()
    await this.save()
    return this;
  }
}

export default Task
