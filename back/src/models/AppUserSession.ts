import { ObjectType } from 'type-graphql';
import { BaseEntity, Entity, PrimaryColumn, ManyToOne } from 'typeorm';

import User from './AppUser';

@Entity()
@ObjectType()
class AppUserSession extends BaseEntity {
  @PrimaryColumn("varchar", {
    length: 32,
  })
  id!: string;

  @ManyToOne(() => User)
  user!: User;
}

export default AppUserSession;
