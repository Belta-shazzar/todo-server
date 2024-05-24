import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthenticationDto } from './dto/registration.dto';
import { AuthResponseDto } from './dto/registration.response.dto';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponseDto)
  async registerUser(
    @Args('registerData') data: AuthenticationDto,
  ): Promise<AuthResponseDto> {
    return this.authService.registerUser(data);
  }

  @Mutation(() => AuthResponseDto)
  async login(
    @Args('loginData') data: AuthenticationDto,
  ): Promise<AuthResponseDto> {
    return this.authService.login(data);
  }
}
