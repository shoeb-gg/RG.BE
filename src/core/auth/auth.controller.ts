import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../jwt-roles/jwt-auth.guard';
import { Roles } from '../jwt-roles/roles.decorator';
import { RoleGuard } from '../jwt-roles/roles.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) { }

  //localhost:1111/api/auth/allusers
  //Using Jwt Guard "User"
  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('allusers')
  async GetAllUsers(): Promise<any> {
    return await this.auth.GetAllUsers();
  }


  //User register api to send otp
  //example of api - Here we use query data
  //url+/auth/register?to=01846970209&full_name=khalid hasan Sagar
  @Get('register')
  async UserRegistrationOtpSend(
    @Query('to') to: any,
    @Query('full_name') full_name: any,
  ): Promise<any> {
    return this.auth.UserRegistrationOtpSend(to, full_name);
  }

  //Verify and register user in system
   //example of api - Here we use params data
  //url+/auth/register/verify-otp/01846970209/khalid hasan Sagar/319764
  @Post('register/verify-otp/:mobile/:name/:otp')
  async VerifyOtpAndRegister(
    @Param('mobile') mobile: any,
    @Param('name') name: any,
    @Param('otp') otp: any,
  ): Promise<any> {
    return this.auth.VerifyOtpAndRegister(mobile, name, otp);
  }

  //User login api to send otp
  //example of api - Here we use query data
  //url+/auth/login?to=01846970209
  @Get('login')
  async UserLoginOtpSend(@Query('to') to: any): Promise<any> {
    return this.auth.UserLoginOtpSend(to)
  }

  //Verify and Login User and Fetch their Data
  //example of api - Here we use params data
  ///auth/login/verify-otp/01846970209/176478
  @Post('/login/verify-otp/:mobile/:otp')
  async VerifyOtpAndLogin(@Param('mobile') mobile: any, @Param('otp') otp: any,): Promise<any> {
    return this.auth.VerifyOtpAndLogin(mobile, otp)
  }

}
