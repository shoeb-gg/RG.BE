import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { PrismaClient } from '@prisma/client';

import { PartnerRegistrationDetailsDto } from 'src/common/dto/partner-reg-details.dto';
import { PartnerBusinessDetailsDto } from 'src/common/dto/partner-business-details.dto';
import { DriverRegistrationDetailsDto } from 'src/common/dto/driver-reg-details.dto';

@Injectable()
export class AccountService {
  private readonly prisma = new PrismaClient();

  async getAccountDetails(partnerId: string): Promise<string> {
    return partnerId + 'HI';
  }

  async createAccountDetails(
    partnerId: any,
    partnerRegInfo: PartnerRegistrationDetailsDto,
  ): Promise<boolean> {
    const newPartnerReg = plainToClass(
      PartnerRegistrationDetailsDto,
      partnerRegInfo,
    );

    try {
      await this.prisma.partner_reg_details.create({
        data: {
          Users: {
            connect: { id: partnerId },
          },
          ...newPartnerReg,
        },
      });

      return true;
    } catch (err) {
      console.log(err);

      return false;
    }
  }

  async createBusinessDetails(
    partnerId: any,
    partnerBusinessInfo: PartnerBusinessDetailsDto,
  ): Promise<boolean> {
    const newPartnerbusiness = plainToClass(
      PartnerBusinessDetailsDto,
      partnerBusinessInfo,
    );

    try {
      await this.prisma.partner_business_details.create({
        data: {
          Users: {
            connect: { id: partnerId },
          },
          ...newPartnerbusiness,
        },
      });

      return true;
    } catch (err) {
      console.log(err);

      return false;
    }
  }

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
