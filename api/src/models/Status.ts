import { Field, ID, ObjectType } from "type-graphql";
import {   BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn, } from "typeorm";

@Entity()
@ObjectType()
class Status extends BaseEntity{
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column("varchar", { length: 150 })
  @Field()
  name!: string;
}

export default Status;