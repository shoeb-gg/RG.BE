import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DriverService } from './driver.service';

import { DriverRegistrationDetailsDto } from 'src/common/dto/driver-reg-details.dto';
import { DriverListDto } from 'src/common/dto/driver-list.dto';
import { successResponse } from 'src/common/models/res.success';
import { Roles } from 'src/core/jwt-roles/roles.decorator';
import { JwtAuthGuard } from 'src/core/jwt-roles/jwt-auth.guard';
import { RoleGuard } from 'src/core/jwt-roles/roles.guard';
import { User } from 'src/common/decorators/user.decorator';

@Controller('drivers')
@ApiTags('Driver Management')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  //Get Drivers list based on partnerId
  //http://localhost:1111/api/drivers/all
  @Roles('user')
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Get('all')
  async getAllDrivers(
   @User() user
  ): Promise<DriverListDto[]> {
    return await this.driverService.getAllDrivers(user.userId);
  }

  //Single driver details
  //http://localhost:1111/api/drivers/driverId
  @Roles('user')
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Get(':driverId')
  async getSingleDriver(@Param('driverId') driverId: string): Promise<any> {
    return await this.driverService.getSingleDriver(driverId);
  }

  //Create driver details
  //http://localhost:1111/api/drivers
  @Roles('user')
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Post()
  async createDriver(
    @Body() DriverRegistrationDetails: DriverRegistrationDetailsDto,
    @User() user
  ): Promise<successResponse> {
    return await this.driverService.createDriver(
      user.userId,
      DriverRegistrationDetails,
    );
  }

  //Update driver details
  //http://localhost:1111/api/drivers/:driverId
  @Roles('user')
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Put(':driverId')
  async updateDriver(
    @Body() DriverInfo: DriverRegistrationDetailsDto,
    @Param('driverId') driverId: string,
  ): Promise<successResponse> {
    return await this.driverService.updateDriver(driverId, DriverInfo);
  }

  //Delete driver details
  //http://localhost:1111/api/drivers/:driverId
  @Roles('user')
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Delete(':driverId')
  async deleteDriver(
    @Param('driverId') driverId: string,
  ): Promise<successResponse> {
    return await this.driverService.deleteDriver(driverId);
  }
}
