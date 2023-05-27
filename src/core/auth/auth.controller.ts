import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

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

  @Get()
  async getUser(): Promise<any> {
    return 0;
  }

  @Post()
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
}
