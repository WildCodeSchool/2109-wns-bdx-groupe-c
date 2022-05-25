import { Field, ID, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { MaxLength, IsNotEmpty } from "class-validator";

@Entity()
@ObjectType()
class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number

  @Column('varchar', { length: 100 })
  @Field()
  @MaxLength(100, {
    message: 'name is too long',
  })
  @IsNotEmpty({ message : 'name can\'t be empty'})
  name!: string

  @Column('varchar', { length: 100 })
  @Field()
  @MaxLength(100, {
    message: 'identifier is too long',
  })
  @IsNotEmpty({ message : 'identifier can\'t be empty'})
  identifier!: string

  async update(name: string, identifier: string) {
    this.name = name;
    this.identifier = identifier;
    await this.save();
    return this;
  }
}

export default Role
