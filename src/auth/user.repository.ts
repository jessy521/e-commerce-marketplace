import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { AuthCredentials } from './dto/auth-credential.dto';
import * as bcrypt from 'bcrypt';
import { User } from './interface/user.interface';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('USER_MODEL')
    private authModel: Model<User>,
  ) {}

  async validateUser(authCredentials): Promise<boolean> {
    const { username } = authCredentials;

    const userExistWithName = await this.authModel.findOne({ username });

    if (userExistWithName === null) {
      return true;
    } else {
      return false;
    }
  }

  async validateUserPassword(authCredentials: AuthCredentials): Promise<any> {
    const { username, password } = authCredentials;

    const user = await this.authModel.findOne({ username });

    if (user === null) {
      throw new UnauthorizedException('Invalid credentials');
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      } else {
        throw new BadRequestException('Invalid credentials');
      }
    }
  }
}
