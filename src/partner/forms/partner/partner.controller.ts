import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PartnerRegistrationDetailsDto } from 'src/common/dto/partner-reg-details.dto';
import { PartnerBusinessDetailsDto } from 'src/common/dto/partner-business-details.dto';

import { PartnerService } from './partner.service';
import { successResponse } from 'src/common/models/res.success';

@Controller('partner')
@ApiTags('Partner Registration')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Get('reg-details/:partnerId')
  async getRegDetails(
    @Param('partnerId') partnerId: string,
  ): Promise<PartnerRegistrationDetailsDto> {
    return await this.partnerService.getRegDetails(partnerId);
  }

  @Post('reg-details/:partnerId')
  async upsertRegDetails(
    @Body() partnerRegInfo: PartnerRegistrationDetailsDto,
    @Param('partnerId') partnerId: string,
  ): Promise<successResponse> {
    return await this.partnerService.upsertRegDetails(
      partnerId,
      partnerRegInfo,
    );
  }

  @Get('business-details/:partnerId')
  async getBusinessDetails(
    @Param('partnerId') partnerId: string,
  ): Promise<PartnerBusinessDetailsDto> {
    return await this.partnerService.getBusinessDetails(partnerId);
  }

  @Post('business-details/:partnerId')
  async upsertBusinessDetails(
    @Body() partnerBusinessInfo: PartnerBusinessDetailsDto,
    @Param('partnerId') partnerId: string,
  ): Promise<successResponse> {
    return await this.partnerService.upsertBusinessDetails(
      partnerId,
      partnerBusinessInfo,
    );
  }
}
