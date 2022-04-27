import { Field, ID, ObjectType } from "type-graphql";
import {   BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany
} from "typeorm";
import Task from './Task'

@Entity()
@ObjectType()
class Status extends BaseEntity{
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column("varchar", { length: 150, unique: true })
  @Field()
  name!: string;

  @OneToMany(() => Task, task => task.status)
  @Field(() => [Task], { nullable: true })
  tasks?: Task[]

  async update(name: string) {
    this.name = name;
    await this.save();
    return this;
  }
}

export default Status;