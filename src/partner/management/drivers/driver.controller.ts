import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Response,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DriverService } from './driver.service';

import { DriverRegistrationDetailsDto } from 'src/common/dto/driver-reg-details.dto';

@Controller('driver')
@ApiTags('Driver Management')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}
  //Create driver details
  //http://localhost:1111/api/driver/driver-reg-details/partnerId
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

  //Delete driver details
  //http://localhost:1111/api/driver/delete/driver-reg-details/:driverId
  @Delete('delete/driver-reg-details/:driverId')
  async deleteDriverDetails(@Param('driverId') driverId: any): Promise<any> {
    return await this.driverService.deleteDriverDetails(driverId);
  }

  //Update driver details
  //http://localhost:1111/api/driver/update/driver-reg-details/:driverId
  @Patch('update/driver-reg-details/:driverId')
  async updateDriverDetails(
    @Body() DriverUpdatedRegistrationDetails,
    @Param('driverId') driverId: any,
  ): Promise<any> {
    return await this.driverService.updateDriverDetails(
      driverId,
      DriverUpdatedRegistrationDetails,
    );
  }

  //Get Drivers list based on partnerId
  //http://localhost:1111/api/driver/all-driver-list/:partnerId
  @Get('all-driver-list/:partnerId')
  async getDriversList(@Param('partnerId') partnerId: any): Promise<any> {
    return await this.driverService.getDriversList(partnerId);
  }

  //Single driver details
  //http://localhost:1111/api/driver/driver-reg-details/driverId
  @Get('driver-reg-details/:driverId')
  async getSingleDriverDetils(@Param('driverId') driverId: any): Promise<any> {
    return await this.driverService.getSingleDriverDetils(driverId);
  }
}
