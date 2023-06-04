import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DriverService } from './driver.service';

import { DriverRegistrationDetailsDto } from 'src/common/dto/driver-reg-details.dto';

@Controller('driver')
@ApiTags('Driver Form')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post('driver-reg-details/:partnerId')
  async createDriverDetails(
    @Body() DriverRegistrationDetails: DriverRegistrationDetailsDto,
    @Param('partnerId') partnerId: any,
  ): Promise<any> {
    return await this.driverService.createDriverDetails(
      partnerId,
      DriverRegistrationDetails,
    );
  }
}
