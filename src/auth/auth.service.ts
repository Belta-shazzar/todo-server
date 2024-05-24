import { ConflictException, Injectable } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { AuthResponseDto } from './dto/registration.response.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { UserType } from 'src/user/user.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async registerUser(data: RegistrationDto): Promise<AuthResponseDto> {
    const user = await this.userService.findByUserName(data.userName);

    if (user) {
      throw new ConflictException(
        `an account with username of ${data.userName} already exist`,
      );
    }

    const password = await bcrypt.hash(data.password, 10);

    const _user: UserType | any = await this.userService.createUser({
      userName: data.userName,
      password,
    });

    const accessToken = this.jwtService.sign({ sub: _user._id });

    return { user: _user, accessToken };
  }
}
