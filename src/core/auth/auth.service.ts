import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaClient } from '@prisma/client';

import { plainToClass } from 'class-transformer';

import { UserDto } from 'src/common/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private JwtService: JwtService) {}
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

  async UserLogin({ id }: UserDto): Promise<any> {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          id: id,
        },
      });
      const payload = { ...user };
      const access_token = this.JwtService.sign(payload);
      return { ...user, access_token };
    } catch (error) {
      throw new NotFoundException('Invalid User Input');
    }
  }

  async GetAllUsers(): Promise<any> {
    const users = this.prisma.users.findMany();
    return users;
  }
}
