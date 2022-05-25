import { Field, ID, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'
import { MaxLength, IsNotEmpty } from "class-validator";
import Project from './Project'

@ObjectType()
@Entity()
class Language extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number

  @Column('varchar', { length: 100 })
  @Field()
  @MaxLength(100, {
    message: 'name is too long',
  })
  @IsNotEmpty({ message : 'This field can\'t be empty'})
  name!: string

  async update(name: string) {
    this.name = name;
    await this.save();
    return this;
  }
}

export default Language
