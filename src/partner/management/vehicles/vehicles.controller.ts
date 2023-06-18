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

import { VehiclesService } from './vehicles.service';

import { successResponse } from 'src/common/models/res.success';
import { VehicleDetailsDto } from 'src/common/dto/vehicle-details.dto';
import { VehicleListDto } from 'src/common/dto/vehicle-list.dto';

@Controller('vehicles')
@ApiTags('Vehicle Management')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get('all/:partnerId')
  async getAllVehicles(
    @Param('partnerId') partnerId: string,
  ): Promise<VehicleListDto[]> {
    return await this.vehiclesService.getAllVehicles(partnerId);
  }

  @Get(':vehicleId')
  async getSingleVehicle(
    @Param('vehicleId') vehicleId: string,
  ): Promise<VehicleDetailsDto> {
    return await this.vehiclesService.getSingleVehicle(vehicleId);
  }

  @Post(':partnerId')
  async createVehicle(
    @Body() vehicleInfo: VehicleDetailsDto,
    @Param('partnerId') partnerId: string,
  ): Promise<successResponse> {
    return await this.vehiclesService.createVehicle(partnerId, vehicleInfo);
  }

  @Put(':vehicleId')
  async updateVehicle(
    @Param('vehicleId') vehicleId: string,
    @Body() vehicleInfo: VehicleDetailsDto,
  ): Promise<successResponse> {
    return await this.vehiclesService.updateVehicle(vehicleId, vehicleInfo);
  }

  @Delete(':vehicleId')
  async deleteVehicle(
    @Param('vehicleId') vehicleId: string,
  ): Promise<successResponse> {
    return await this.vehiclesService.deleteVehicle(vehicleId);
  }
}
