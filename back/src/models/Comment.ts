import { Field, ID, ObjectType } from "type-graphql";
import {   BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn, } from "typeorm";

@Entity()
@ObjectType()
class Comment extends BaseEntity{
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column("text")
  @Field()
  content!: string;

  @Column()
  @Field()
  createdAt!: Date;

  @Column()
  @Field()
  updatedAt!: Date;
}

export default Comment;