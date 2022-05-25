import { Field, ID, ObjectType } from "type-graphql";
import { MaxLength, IsNotEmpty } from "class-validator";
import {   BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn, } from "typeorm";

@Entity()
@ObjectType()
class ProjectRole extends BaseEntity{
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column("varchar", { length: 100 })
  @Field()
  @MaxLength(100, {
    message: 'name is too long',
  })
  @IsNotEmpty({ message : 'name can\'t be empty'})
  name!: string;

  async update(name: string) {
    this.name = name;
    await this.save();
    return this;
  }
}

export default ProjectRole;