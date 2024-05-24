import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthenticationDto } from './dto/registration.dto';
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

  async registerUser(data: AuthenticationDto): Promise<AuthResponseDto> {
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

  async login(data: AuthenticationDto): Promise<AuthResponseDto> {
    const user = await this.userService.findByUserName(data.userName);

    if (!user) {
      throw new NotFoundException('account not found');
    }

    const matchPassword = await bcrypt.compare(data.password, user.password);

    if (!matchPassword) {
      throw new BadRequestException('incorrect password');
    }

    const accessToken = this.jwtService.sign({ sub: user._id });

    return { user: user as any, accessToken };
  }
}
