import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { AccountService } from './account.service';
import { PartnerRegistrationDetailsDto } from 'src/common/dto/partner-reg-details.dto';
import { PartnerBusinessDetailsDto } from 'src/common/dto/partner-business-details.dto';
import { DriverRegistrationDetailsDto } from 'src/common/dto/driver-reg-details.dto';

@ApiTags('Account Settings')
@Controller('settings/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('reg-details/:partnerId')
  async getAccountDetails(
    @Param('partnerId') partnerId: string,
  ): Promise<string> {
    return await this.accountService.getAccountDetails(partnerId);
  }

  @Post('reg-details/:partnerId')
  async createAccountDetails(
    @Body() partnerRegInfo: PartnerRegistrationDetailsDto,
    @Param('partnerId') partnerId: any,
  ): Promise<any> {
    return await this.accountService.createAccountDetails(
      partnerId,
      partnerRegInfo,
    );
  }

  @Post('business-details/:partnerId')
  async createBusinessDetails(
    @Body() partnerBusinessInfo: PartnerBusinessDetailsDto,
    @Param('partnerId') partnerId: any,
  ): Promise<any> {
    return await this.accountService.createBusinessDetails(
      partnerId,
      partnerBusinessInfo,
    );
  }

  @Post('driver-reg-details/:partnerId')
  async createDriverDetails(
    @Body() DriverRegistrationDetails: DriverRegistrationDetailsDto,
    @Param('partnerId') partnerId: any,
  ): Promise<any> {
    return await this.accountService.createDriverDetails(
      partnerId,
      DriverRegistrationDetails,
    );
  }
}
