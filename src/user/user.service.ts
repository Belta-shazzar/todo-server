import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByUserName(userName: string) {
    return this.userModel.findOne({ userName });
  }

  async createUser(data: Partial<User>) {
    return this.userModel.create(data);
  }
}
