import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentials } from './dto/auth-credential.dto';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from './interface/user.interface';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
// import { PoliciesGuard } from 'src/casl/policies.guard';
// import { CheckPolicies } from 'src/casl/decorator/check-policies.decorator';
// import { Action } from 'src/casl/action.enum';
// import { AppAbility } from 'src/casl/casl-ability.factor';

@ApiTags('api')
@Controller('api')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('/auth/register')
  @ApiCreatedResponse({ description: 'this response has created successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  signUp(
    @Body(new ValidationPipe()) authCredentials: CreateAuthDto,
  ): Promise<User> {
    return this.authService.signUp(authCredentials);
  }

  @Post('/auth/login')
  @ApiOkResponse({ description: 'The resource has been successfully returned' })
  @ApiForbiddenResponse({ description: 'Invalid credentials' })
  async signin(
    @Body(ValidationPipe) authCredentials: AuthCredentials,
    @Res() response: Response,
  ): Promise<string> {
    const token = await this.authService.signIn(authCredentials);
    // console.log(token);

    response
      .cookie('access_token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .send(token);

    return token;
  }

  @Get('/buyer/list-of-sellers')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'User verified Successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorised User' })
  getSellers() {
    return this.authService.getSellers();
  }

  // to verify the user's token
  // @Get('/auth/user')
  // @UseGuards(JwtAuthGuard)
  // @ApiOkResponse({ description: 'User verified Successfully' })
  // @ApiUnauthorizedResponse({ description: 'Unauthorised User' })
  // async user(@Req() request: Request) {
  //   try {
  //     const cookies = request.cookies['access_token'];
  //     const data = await this.jwtService.verifyAsync(cookies);
  //     if (!data) {
  //       throw new UnauthorizedException();
  //     }

  //     // const user = await this.authService.findOne({username: data.username});
  //     return data;
  //   } catch (e) {
  //     throw new UnauthorizedException();
  //   }
  // }

  // to logout by delelting the token
  @ApiOkResponse({ description: 'User verified Successfully' })
  @ApiBadRequestResponse({ description: 'login failed' })
  @Post('/auth/logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token');

    return {
      message: 'Logged out successfully',
    };
  }
}
