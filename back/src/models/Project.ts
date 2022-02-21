import { Field, ID, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import Language from './Language'
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

  @ManyToOne(() => User, user => user.projectsCreated)
  @Field(() => User, { nullable: true })
  createdBy?: User

  @ManyToMany(() => Language, { cascade: true })
  @JoinTable({
    name: 'project_language',
    joinColumn: { name: 'projectId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'languageId' },
  })
  @Field(() => [Language])
  languages?: Language[]
}

export default Project
