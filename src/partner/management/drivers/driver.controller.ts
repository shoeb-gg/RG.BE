import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DriverService } from './driver.service';

import { DriverRegistrationDetailsDto } from 'src/common/dto/driver-reg-details.dto';
import { DriverListDto } from 'src/common/dto/driver-list.dto';
import { successResponse } from 'src/common/models/res.success';

@Controller('drivers')
@ApiTags('Driver Management')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  //Get Drivers list based on partnerId
  //http://localhost:1111/api/drivers/all/:partnerId
  @Get('all/:partnerId')
  async getAllDrivers(
    @Param('partnerId') partnerId: string,
  ): Promise<DriverListDto[]> {
    return await this.driverService.getAllDrivers(partnerId);
  }

  //Single driver details
  //http://localhost:1111/api/drivers/driverId
  @Get(':driverId')
  async getSingleDriver(@Param('driverId') driverId: string): Promise<any> {
    return await this.driverService.getSingleDriver(driverId);
  }

  //Create driver details
  //http://localhost:1111/api/drivers/partnerId
  @Post(':partnerId')
  async createDriver(
    @Body() DriverRegistrationDetails: DriverRegistrationDetailsDto,
    @Param('partnerId') partnerId: string,
  ): Promise<successResponse> {
    return await this.driverService.createDriver(
      partnerId,
      DriverRegistrationDetails,
    );
  }

  //Update driver details
  //http://localhost:1111/api/drivers/:driverId
  @Put(':driverId')
  async updateDriver(
    @Body() DriverInfo: DriverRegistrationDetailsDto,
    @Param('driverId') driverId: string,
  ): Promise<successResponse> {
    return await this.driverService.updateDriver(driverId, DriverInfo);
  }

  //Delete driver details
  //http://localhost:1111/api/drivers/:driverId
  @Delete(':driverId')
  async deleteDriver(
    @Param('driverId') driverId: string,
  ): Promise<successResponse> {
    return await this.driverService.deleteDriver(driverId);
  }
}
