import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { UserDto } from 'src/common/dto/user.dto';
import { JwtAuthGuard } from '../jwt-roles/jwt-auth.guard';
import { Roles } from '../jwt-roles/roles.decorator';
import { RoleGuard } from '../jwt-roles/roles.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('registration')
  async createUser(@Body() userInfo: UserDto): Promise<any> {
    return await this.auth.createUser(userInfo);
  }

  @Post('login')
  async UserLogin(@Body() BodyData: UserDto): Promise<any> {
    return await this.auth.UserLogin(BodyData);
  }

  //localhost:1111/api/auth/allusers
  //Using Jwt Guard Admin
  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('allusers')
  async GetAllUsers(): Promise<any> {
    return await this.auth.GetAllUsers();
  }

  @Get('send-otp')
  async SendOtp(@Query('to') to: any): Promise<any> {
    const mobileNumber = 88 + to
    return this.auth.SendOtp(mobileNumber)
  }

  // @Get('otp')
  // async GetOtp (@Query('phoneNumber') phoneNumber:string):Promise<any>{
  //   return await this.auth.GetOtp(phoneNumber);
  // }

  // @Post('test')
  // async Test(@Query('name')name: any , @Query('mobile') mobile: any):Promise<any> {
  //   console.log(mobile);
  //   return await this.auth.Test(name,mobile)    
  // }

  // @Get('testsmsapi')
  // async TestSms():Promise<any>{
  //   return this.auth.TestSms()
  // }
}

