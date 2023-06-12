import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { AccountService } from './account.service';

import { successResponse } from 'src/common/models/res.success';
import { AccountDetailsDto } from 'src/common/dto/account-details.dto';

@ApiTags('Account Settings')
@Controller('settings/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('details/:partnerId')
  async getAccountDetails(
    @Param('partnerId') partnerId: string,
  ): Promise<AccountDetailsDto> {
    return await this.accountService.getAccountDetails(partnerId);
  }

  @Post('details/:partnerId')
  async updateAccountDetails(
    @Body() partnerAccountInfo: AccountDetailsDto,
    @Param('partnerId') partnerId: string,
  ): Promise<successResponse> {
    return await this.accountService.updateAccountDetails(
      partnerId,
      partnerAccountInfo,
    );
  }
}
