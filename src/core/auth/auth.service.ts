import { Injectable } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

import { plainToClass } from 'class-transformer';

import { UserDto } from 'src/common/dto/user.dto';

@Injectable()
export class AuthService {
  private readonly prisma = new PrismaClient();

  async createUser(userInfo: UserDto): Promise<any> {
    const newUser = plainToClass(UserDto, userInfo);

    try {
      await this.prisma.users.create({
        data: newUser,
      });
    } catch (err) {
      return err;
    }

    return true;
  }
}
