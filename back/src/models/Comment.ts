import { Field, ID, ObjectType} from "type-graphql";
import {   BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn, ManyToOne  } from "typeorm";
  import { IsNotEmpty } from "class-validator";

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
  @IsNotEmpty({ message : 'This field can\'t be empty'})
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


  @ManyToOne(() => Task, task => task.comments, { onDelete: 'CASCADE' })
  @Field(() => Task)
  task!: Task;

  async update(content: string) {
    this.content = content;
    this.updatedAt = new Date();
    await this.save();
    return this;
  }
}

export default Comment;