import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { PrismaClient } from '@prisma/client';

import { DriverRegistrationDetailsDto } from 'src/common/dto/driver-reg-details.dto';

@Injectable()
export class DriverService {
  private readonly prisma = new PrismaClient();

  //Driver registration by partner
  //Create driver details
  async createDriverDetails(
    partnerId: any,
    DriverRegistrationDetails: DriverRegistrationDetailsDto,
  ): Promise<boolean> {
    const newDriverReg = plainToClass(
      DriverRegistrationDetailsDto,
      DriverRegistrationDetails,
    );
    try {
      await this.prisma.driver_reg_details.create({
        data: {
          Users: {
            connect: { id: partnerId },
          },
          ...newDriverReg,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //Delete driver detials
  async deleteDriverDetails(driverId: any): Promise<boolean> {
    try {
      await this.prisma.driver_reg_details.delete({
        where: {
          id: driverId,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //Update driver details
  async updateDriverDetails(
    driverId: any,
    DriverUpdatedRegistrationDetails: DriverRegistrationDetailsDto,
  ): Promise<boolean> {
    const updateDriver = plainToClass(
      DriverRegistrationDetailsDto,
      DriverUpdatedRegistrationDetails,
    );
    try {
      await this.prisma.driver_reg_details.update({
        where: {
          id: driverId,
        },
        data: updateDriver,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //All drivers list based on partnerId
  async getDriversList(partnerId: any): Promise<boolean> {
    try {
      const driversList = await this.prisma.driver_reg_details.findMany({
        where: {
          user_id: partnerId,
        },
      });
      console.log(driversList);
      return true
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //Get a single driver details
  async getSingleDriverDetils(driverId: any): Promise<boolean> {
    try {
      const driverDetails = await this.prisma.driver_reg_details.findFirst({
        where: {
          id: driverId,
        },
      });
      console.log(driverDetails);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
