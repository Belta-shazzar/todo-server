import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserType } from './user.type';
import { AuthenticationDto } from 'src/auth/dto/registration.dto';
import { AuthResponseDto } from 'src/auth/dto/registration.response.dto';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => UserType, { nullable: true })
  getMe(@Args('id') id: string) {
    return null;
  }

  // @Mutation((returns) => AuthResponseDto)
  // async registerUser(@Args('registerData') data: RegistrationDto) {
  //   // return this.userService.
  // }
}
