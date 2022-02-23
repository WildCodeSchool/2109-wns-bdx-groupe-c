import { Field, ID, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm'

import Comment from './Comment'
import Project from './Project'
import Role from './Role'
import Task from './Task'
@Entity()
@ObjectType()
class AppUser extends BaseEntity {
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

  // On enlève le @Field() pour ne pas afficher le mot de passe côté Front
  @Column('varchar', { length: 255 })
  password!: string

  @Column('boolean', { default: true })
  @Field()
  isActive!: boolean

  @CreateDateColumn()
  @Field()
  createdAt!: Date

  @CreateDateColumn()
  @Field()
  updatedAt!: Date

  @ManyToOne(() => Role)
  @Field(() => Role, { nullable: true })
  role?: Role

  @OneToMany(() => Comment, comment => comment.user)
  @Field(() => [Comment], { nullable: true })
  comments?: Comment[]

  @OneToMany(() => Project, project => project.createdBy)
  @Field(() => [Project], { nullable: true })
  projectsCreated?: Project[]

  @OneToMany(() => Task, task => task.assignee)
  @Field(() => [Task], { nullable: true })
  tasks?: Task[]
}

export default AppUser
