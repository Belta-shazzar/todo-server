import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class UserType extends User {
  @Field(() => ID)
  readonly id: string;
}
