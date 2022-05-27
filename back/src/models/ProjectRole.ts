import { Field, ID, ObjectType } from "type-graphql";
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
  name!: string;

  async update(name: string) {
    this.name = name;
    await this.save();
    return this;
  }
}

export default ProjectRole;