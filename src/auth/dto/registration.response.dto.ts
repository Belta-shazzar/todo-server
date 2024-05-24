import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/user/user.model';
import { UserType } from 'src/user/user.type';

@ObjectType()
export class AuthResponseDto {
  @Field(() => UserType)
  user: UserType;

  @Field()
  accessToken: string;
}