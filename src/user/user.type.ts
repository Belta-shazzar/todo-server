import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
@Directive('@key(fields:"id")')
export class UserType extends User {
  @Field(() => ID)
  readonly _id: string;
}
