import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class InitService {
  private readonly prisma = new PrismaClient();

  async getTotalVehicles(partnerId: string): Promise<number> {
    try {
      return await this.prisma.vehicle_reg_details.count({
        where: {
          user_id: partnerId,
        },
      });
    } catch {
      throw new HttpException(
        'Error while Database Operation',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async getTotalDrivers(partnerId: string): Promise<number> {
    try {
      return await this.prisma.driver_reg_details.count({
        where: {
          user_id: partnerId,
        },
      });
    } catch {
      throw new HttpException(
        'Error while Database Operation',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
