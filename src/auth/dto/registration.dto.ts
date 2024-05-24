import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class AuthenticationDto {
  @Field()
  @IsNotEmpty()
  userName: string;

  @Field()
  @IsString()
  @MinLength(6)
  password: string;
}
