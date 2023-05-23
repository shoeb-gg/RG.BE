import { Body, Controller, Get, Post } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { UserDto } from 'src/common/dto/user.dto';

@ApiTags('Account Settings')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Get()
  async getUser(): Promise<any> {
    return 0;
  }

  @Post()
  async createUser(@Body() userInfo: UserDto): Promise<any> {
    return this.auth.createUser(userInfo);
  }
}
