import { Field, ID, ObjectType} from "type-graphql";
import User from "./User";
import {   BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn, ManyToOne  } from "typeorm";

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

  @ManyToOne(() => User, user => user.comments)
  @Field(() => User)
  user!: User;
}

export default Comment;