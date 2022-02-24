import { Field, ID, ObjectType, Int } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm'
import Language from './Language'
import User from './AppUser'
import Task from './Task'
import Status from './Status'

import {toUniqueArray} from '../helpers/helper';

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

  @ManyToOne(() => User, user => user.projectsCreated)
  @Field(() => User, { nullable: true })
  createdBy?: User

  @ManyToMany(() => Language, { cascade: true })
  @JoinTable({
    name: 'project_language',
    joinColumn: { name: 'projectId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'languageId' },
  })
  @Field(() => [Language], { nullable: true })
  languages?: Language[]

  @OneToMany(() => Task, task => task.project, { cascade: true })
  @Field(() => [Task], { nullable: true })
  tasks?: Task[]

  @ManyToOne(() => Status, {cascade: true})
  @Field(() => Status, { nullable: true })
  status?: Status

  @Field(()=> Int)
  get countAssignee(): number {
    if(this.tasks) {
      const assignees = this.tasks.map(task => {
        if(task.assignee) {
          return task.assignee.id;
        } else {
          return null;
        }
      });
      return toUniqueArray(assignees).length;
    } else {
      return 0;
    }
  }

  update(name?: string, shortText?: string, description?: string, initialTimeSpent?: number) {
    if (name) this.name = name
    if (shortText) this.shortText = shortText
    if (description) this.description = description
    if (initialTimeSpent) this.initialTimeSpent = initialTimeSpent
    this.updatedAt = new Date()
    this.save();
    return this;
  }

  updateStatus(status: Status) {
    this.status = status;
    this.updatedAt = new Date();
    this.save();
    return this;
  }
}

export default Project
