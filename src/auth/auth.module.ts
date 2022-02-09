import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { authProviders } from './provider/auth.provider';
import { UserRepository } from './user.repository';
import { AuthStrategy } from './strategy/auth.strategy';
import { DatabaseModule } from 'src/database/database.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
// import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'abcdefghijklmnop',
      signOptions: {
        expiresIn: 60000,
      },
    }),
    DatabaseModule,
    // CaslModule,
  ],

  controllers: [AuthController],

  providers: [...authProviders, AuthService, UserRepository, AuthStrategy],

  exports: [PassportModule],
})
export class AuthModule {}
