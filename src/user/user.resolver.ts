import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.gaurd';
import { CurrentUser } from 'src/shared/decorators/currentUser.decorator';
import { User } from './user.model';
import { UserType } from './user.type';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserType)
  @UseGuards(AuthGuard)
  getMe(@CurrentUser() user: Partial<User>) {
    return user;
  }
}
