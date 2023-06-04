import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { PrismaClient } from '@prisma/client';

import { DriverRegistrationDetailsDto } from 'src/common/dto/driver-reg-details.dto';

@Injectable()
export class DriverService {
  private readonly prisma = new PrismaClient();

  //Driver registration by partner
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
}
