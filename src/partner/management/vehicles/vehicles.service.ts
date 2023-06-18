import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { PrismaClient } from '@prisma/client';

import { successResponse } from 'src/common/models/res.success';
import { VehicleDetailsDto } from 'src/common/dto/vehicle-details.dto';
import { VehicleListDto } from 'src/common/dto/vehicle-list.dto';

@Injectable()
export class VehiclesService {
  private readonly prisma = new PrismaClient();

  async getAllVehicles(partnerId: string): Promise<VehicleListDto[]> {
    try {
      const vehicleInfo: VehicleListDto[] =
        await this.prisma.vehicle_reg_details.findMany({
          where: {
            user_id: partnerId,
          },
          select: {
            id: true,
            vehicle_brand: true,
            vehicle_model: true,
            vehicle_number_plate: true,
          },
        });

      return vehicleInfo;
    } catch {
      throw new HttpException(
        'Error while Database Operation',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async getSingleVehicle(vehicleId: string): Promise<VehicleDetailsDto> {
    try {
      const vehicleInfo: VehicleDetailsDto =
        await this.prisma.vehicle_reg_details.findUnique({
          where: {
            id: vehicleId,
          },
        });

      return vehicleInfo;
    } catch {
      throw new HttpException(
        'Error while Database Operation',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async createVehicle(
    partnerId: string,
    vehicleInfo: VehicleDetailsDto,
  ): Promise<successResponse> {
    const newVehicle = plainToClass(VehicleDetailsDto, vehicleInfo);

    try {
      await this.prisma.vehicle_reg_details.create({
        data: {
          user_id: partnerId,
          ...newVehicle,
        },
      });

      return {
        message: 'Data Saved Successfully!',
        status: HttpStatus.CREATED,
      };
    } catch (err) {
      console.log(err);

      throw new HttpException('Complete the Form!', HttpStatus.FORBIDDEN);
    }
  }

  async updateVehicle(
    vehicleId: string,
    vehicleInfo: VehicleDetailsDto,
  ): Promise<successResponse> {
    const updatedVehicle = plainToClass(VehicleDetailsDto, vehicleInfo);

    try {
      await this.prisma.vehicle_reg_details.update({
        where: {
          id: vehicleId,
        },
        data: { ...updatedVehicle },
      });

      return {
        message: 'Data Saved Successfully!',
        status: HttpStatus.CREATED,
      };
    } catch (err) {
      console.log(err);

      throw new HttpException('Complete the Form!', HttpStatus.FORBIDDEN);
    }
  }

  async deleteVehicle(vehicleId: string): Promise<successResponse> {
    try {
      await this.prisma.vehicle_reg_details.delete({
        where: {
          id: vehicleId,
        },
      });

      return {
        message: 'Data Deleted Successfully!',
        status: HttpStatus.CREATED,
      };
    } catch (err) {
      console.log(err);

      throw new HttpException(
        'Error in Database Operation!',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
