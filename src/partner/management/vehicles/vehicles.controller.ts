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

import { User } from 'src/common/decorators/user.decorator';
import { RoleGuard } from 'src/core/jwt-roles/roles.guard';
import { Roles } from 'src/core/jwt-roles/roles.decorator';
import { JwtAuthGuard } from 'src/core/jwt-roles/jwt-auth.guard';

import { VehiclesService } from './vehicles.service';

import { successResponse } from 'src/common/models/res.success';
import { VehicleDetailsDto } from 'src/common/dto/vehicle-details.dto';
import { VehicleListDto } from 'src/common/dto/vehicle-list.dto';
import { VehicleDocumentsDto } from 'src/common/dto/vehicle-documents.dto';

@Controller('vehicles')
@ApiTags('Vehicle Management')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('all')
  async getAllVehicles(@User() user): Promise<VehicleListDto[]> {
    return await this.vehiclesService.getAllVehicles(user.userId);
  }

  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':vehicleId')
  async getSingleVehicle(
    @Param('vehicleId') vehicleId: string,
  ): Promise<VehicleDetailsDto> {
    return await this.vehiclesService.getSingleVehicle(vehicleId);
  }

  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  async createVehicle(
    @Body() vehicleInfo: VehicleDetailsDto,
    @User() user,
  ): Promise<successResponse> {
    return await this.vehiclesService.createVehicle(user.userId, vehicleInfo);
  }

  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('document/:vehicleId')
  async getVehicleDocuments(
    @Param('vehicleId') vehicleId: string,
  ): Promise<VehicleDocumentsDto> {
    return await this.vehiclesService.getVehicleDocuments(vehicleId);
  }

  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('document/:vehicleId')
  async upsertVehicleDocuments(
    @Param('vehicleId') vehicleId: string,
    @Body() documentsContent: VehicleDocumentsDto,
  ): Promise<successResponse> {
    return await this.vehiclesService.upsertVehicleDocuments(
      vehicleId,
      documentsContent,
    );
  }

  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put(':vehicleId')
  async updateVehicle(
    @Param('vehicleId') vehicleId: string,
    @Body() vehicleInfo: VehicleDetailsDto,
  ): Promise<successResponse> {
    return await this.vehiclesService.updateVehicle(vehicleId, vehicleInfo);
  }

  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':vehicleId')
  async deleteVehicle(
    @Param('vehicleId') vehicleId: string,
  ): Promise<successResponse> {
    return await this.vehiclesService.deleteVehicle(vehicleId);
  }
}
