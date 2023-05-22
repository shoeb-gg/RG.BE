import { Body, Controller, Get, Post } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { AccountService } from './account.service';

@ApiTags('Account Settings')
@Controller('settings/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  async getAccountDetails(): Promise<any> {
    return this.accountService.getAccountDetails();
  }

  @Post()
  async createAccountDetails(@Body() accountInfo: any): Promise<any> {
    return accountInfo;
  }
}
