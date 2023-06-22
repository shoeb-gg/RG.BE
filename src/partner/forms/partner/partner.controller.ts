import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PartnerRegistrationDetailsDto } from 'src/common/dto/partner-reg-details.dto';
import { PartnerBusinessDetailsDto } from 'src/common/dto/partner-business-details.dto';

import { PartnerService } from './partner.service';
import { successResponse } from 'src/common/models/res.success';
import { Roles } from 'src/core/jwt-roles/roles.decorator';
import { JwtAuthGuard } from 'src/core/jwt-roles/jwt-auth.guard';
import { RoleGuard } from 'src/core/jwt-roles/roles.guard';
import { User } from 'src/common/decorators/user.decorator';

@Controller('partner')
@ApiTags('Partner Registration')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) { }

  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('reg-details')
  async getRegDetails(@User() user
  ): Promise<PartnerRegistrationDetailsDto> {
    return await this.partnerService.getRegDetails(user.userId);
  }
  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('reg-details')
  async upsertRegDetails(
    @Body() partnerRegInfo: PartnerRegistrationDetailsDto, @User() user
  ): Promise<successResponse> {
    return await this.partnerService.upsertRegDetails(
      user.userId,
      partnerRegInfo,
    );
  }
  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('business-details')
  async getBusinessDetails(
    @User() user
  ): Promise<PartnerBusinessDetailsDto> {
    return await this.partnerService.getBusinessDetails(user.userId);
  }
  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('business-details')
  async upsertBusinessDetails(
    @Body() partnerBusinessInfo: PartnerBusinessDetailsDto,
    @User() user
  ): Promise<successResponse> {
    return await this.partnerService.upsertBusinessDetails(
      user.userId,
      partnerBusinessInfo,
    );
  }
}
