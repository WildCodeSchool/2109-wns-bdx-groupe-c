import { Field, ID, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'

import Project from './Project'

@ObjectType()
@Entity()
class Language extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number

  @Column('varchar', { length: 100 })
  @Field()
  name!: string

  async update(name: string) {
    this.name = name;
    await this.save();
    return this;
  }
}

export default Language
