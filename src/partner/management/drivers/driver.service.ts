import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { PrismaClient } from '@prisma/client';

import { DriverRegistrationDetailsDto } from 'src/common/dto/driver-reg-details.dto';
import { DriverListDto } from 'src/common/dto/driver-list.dto';
import { successResponse } from 'src/common/models/res.success';

@Injectable()
export class DriverService {
  private readonly prisma = new PrismaClient();

  //Driver registration by partner
  //Create driver details
  async createDriver(
    partnerId: string,
    DriverRegistrationDetails: DriverRegistrationDetailsDto,
  ): Promise<successResponse> {
    const newDriver = plainToClass(
      DriverRegistrationDetailsDto,
      DriverRegistrationDetails,
    );
    try {
      await this.prisma.driver_reg_details.create({
        data: {
          user_id: partnerId,
          ...newDriver,
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

  //Update driver details
  async updateDriver(
    driverId: string,
    DriverInfo: DriverRegistrationDetailsDto,
  ): Promise<successResponse> {
    const updatedDriver = plainToClass(
      DriverRegistrationDetailsDto,
      DriverInfo,
    );
    try {
      await this.prisma.driver_reg_details.update({
        where: {
          id: driverId,
        },
        data: { ...updatedDriver },
      });
      return {
        message: 'Data Saved Successfully!',
        status: HttpStatus.CREATED,
      };
    } catch (err) {
      throw new HttpException(
        'Error in Database Operation!',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  //All drivers list based on partnerId
  async getAllDrivers(partnerId: string): Promise<DriverListDto[]> {
    try {
      const driversList: DriverListDto[] =
        await this.prisma.driver_reg_details.findMany({
          where: {
            user_id: partnerId,
          },
          select: {
            id: true,
            full_name: true,
            experience: true,
          },
        });

      return driversList;
    } catch (error) {
      throw new HttpException(
        'Error while Database Operation',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  //Get a single driver details
  async getSingleDriver(driverId: any): Promise<DriverRegistrationDetailsDto> {
    try {
      const driverDetails: DriverRegistrationDetailsDto =
        await this.prisma.driver_reg_details.findUnique({
          where: {
            id: driverId,
          },
        });
      return driverDetails;
    } catch (error) {
      throw new HttpException(
        'Error while Database Operation',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  //Delete driver detials
  async deleteDriver(driverId: any): Promise<successResponse> {
    try {
      await this.prisma.driver_reg_details.delete({
        where: {
          id: driverId,
        },
      });
      return {
        message: 'Data Deleted Successfully!',
        status: HttpStatus.CREATED,
      };
    } catch (err) {
      throw new HttpException(
        'Error in Database Operation!',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
