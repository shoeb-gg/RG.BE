import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService {
  async getAccountDetails(): Promise<any> {
    return 'HII';
  }

  async createAccountDetails(): Promise<any> {
    return 'HII';
  }
}
