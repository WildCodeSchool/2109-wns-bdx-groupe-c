import { Field, ID, ObjectType} from "type-graphql";
import {   BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn, ManyToOne  } from "typeorm";

  import User from "./AppUser";
  import Task from "./Task";
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


  @ManyToOne(() => Task, task => task.comments)
  @Field(() => Task)
  task!: Task;
}

export default Comment;