import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { AccountService } from './account.service';

import { successResponse } from 'src/common/models/res.success';
import { AccountDetailsDto } from 'src/common/dto/account-details.dto';
import { Roles } from 'src/core/jwt-roles/roles.decorator';
import { JwtAuthGuard } from 'src/core/jwt-roles/jwt-auth.guard';
import { RoleGuard } from 'src/core/jwt-roles/roles.guard';
import { User } from 'src/common/decorators/user.decorator';

@ApiTags('Account Settings')
@Controller('settings/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Roles('user')
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Get('details')
  async getAccountDetails(
    @User() user
  ): Promise<AccountDetailsDto> {
    return await this.accountService.getAccountDetails(user.userId);
  }

  @Roles('user')
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Post('details')
  async updateAccountDetails(
    @Body() partnerAccountInfo: AccountDetailsDto,
    @User() user
  ): Promise<successResponse> {
    return await this.accountService.updateAccountDetails(
      user.userId,
      partnerAccountInfo,
    );
  }
}
