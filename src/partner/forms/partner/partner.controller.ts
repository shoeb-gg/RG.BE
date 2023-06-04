import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PartnerRegistrationDetailsDto } from 'src/common/dto/partner-reg-details.dto';
import { PartnerBusinessDetailsDto } from 'src/common/dto/partner-business-details.dto';

import { PartnerService } from './partner.service';

@Controller('partner')
@ApiTags('Partner Registration')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Get('reg-details/:partnerId')
  async getAccountDetails(
    @Param('partnerId') partnerId: string,
  ): Promise<string> {
    return await this.partnerService.getAccountDetails(partnerId);
  }

  @Post('reg-details/:partnerId')
  async createAccountDetails(
    @Body() partnerRegInfo: PartnerRegistrationDetailsDto,
    @Param('partnerId') partnerId: any,
  ): Promise<any> {
    return await this.partnerService.createAccountDetails(
      partnerId,
      partnerRegInfo,
    );
  }

  @Post('business-details/:partnerId')
  async createBusinessDetails(
    @Body() partnerBusinessInfo: PartnerBusinessDetailsDto,
    @Param('partnerId') partnerId: any,
  ): Promise<any> {
    return await this.partnerService.createBusinessDetails(
      partnerId,
      partnerBusinessInfo,
    );
  }
}
