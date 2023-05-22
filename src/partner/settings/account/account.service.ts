import { Injectable } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class AccountService {
  private readonly prisma = new PrismaClient();

  async getAccountDetails(): Promise<any> {
    return 'HII';
  }

  async createAccountDetails(): Promise<any> {
    return 'HII';
  }
}
