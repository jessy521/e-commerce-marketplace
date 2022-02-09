import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { AuthCredentials } from './dto/auth-credential.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { User } from './interface/user.interface';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_MODEL')
    private authModel: Model<User>,
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentials: CreateAuthDto): Promise<User> {
    const { password, confirmPassword } = authCredentials;

    if (password === confirmPassword) {
      const regularUser = await this.userRepository.validateUser(
        authCredentials,
      );

      if (regularUser) {
        const user = new this.authModel(authCredentials);
        user.password = await bcrypt.hash(user.password, 10);
        if (user.role === 'seller') {
          user.isSeller = true;
        } else if (user.role === 'buyer') {
          user.isSeller = false;
        }
        await user.save();

        return user;
      } else {
        throw new ConflictException('user already exist');
      }
    } else {
      throw new BadRequestException('password mimsmatched');
    }
  }

  async signIn(authCredentials: AuthCredentials): Promise<string> {
    const user = await this.userRepository.validateUserPassword(
      authCredentials,
    );

    const payload: JwtPayload = {
      username: user.username,
      _id: user._id,
      role: user.role,
    };
    const accessToken = await this.jwtService.sign(payload);
    return accessToken;
  }

  async findOne(email: string): Promise<User> {
    const user = this.authModel.findOne({ email });

    return user.select({ password: 0 });
  }

  async getSellers() {
    try {
      return await this.authModel.find({ role: 'seller', isSeller: true });
    } catch (error) {
      throw new ForbiddenException({ message: error.message });
    }
  }
}
