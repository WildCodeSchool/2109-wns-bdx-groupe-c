import { Field, ID, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from "typeorm";

  @Entity()
  @ObjectType()
  class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id!: number;
  
    @Column()
    @Field()
    name!: string;

    @Column()
    @Field()
    email!: string;
  }
  
  export default User;
  