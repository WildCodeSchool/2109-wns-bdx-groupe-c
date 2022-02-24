import { Field, ID, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@ObjectType()
class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number

  @Column('varchar', { length: 100 })
  @Field()
  name!: string

  @Column('varchar', { length: 100 })
  @Field()
  identifier!: string

  update(name: string, identifier: string) {
    this.name = name;
    this.identifier = identifier;
    this.save();
    return this;
  }
}

export default Role
