import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { PrismaClient } from '@prisma/client';

import { PartnerRegistrationDetailsDto } from 'src/common/dto/partner-reg-details.dto';
import { PartnerBusinessDetailsDto } from 'src/common/dto/partner-business-details.dto';
import { successResponse } from 'src/common/models/res.success';

@Injectable()
export class PartnerService {
  private readonly prisma = new PrismaClient();

  async getRegDetails(
    partnerId: string,
  ): Promise<PartnerRegistrationDetailsDto> {
    try {
      const regInfo = await this.prisma.partner_reg_details.findUnique({
        where: {
          user_id: partnerId,
        },
      });

      const accountInfo = await this.prisma.account_details.findUnique({
        where: {
          user_id: partnerId,
        },
      });

      const regData: PartnerRegistrationDetailsDto = {
        ...regInfo,
        mobile: accountInfo.mobile,
        email: accountInfo.email,
      };

      return regData;
    } catch {
      throw new HttpException(
        'Error while Database Operation',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async upsertRegDetails(
    partnerId: string,
    partnerRegInfo: PartnerRegistrationDetailsDto,
  ): Promise<successResponse> {
    const newPartnerReg: any = plainToClass(
      PartnerRegistrationDetailsDto,
      partnerRegInfo,
    );

    const updatedAccountDetails = {
      dob: partnerRegInfo.dob,
      mobile: partnerRegInfo.mobile,
      email: partnerRegInfo.email,
      form_completed: true,
    };

    try {
      await this.prisma.partner_reg_details.upsert({
        where: {
          user_id: partnerId,
        },
        update: {
          ...newPartnerReg,
        },
        create: {
          Users: {
            connect: { id: partnerId },
          },
          ...newPartnerReg,
        },
      });

      await this.prisma.account_details.update({
        where: {
          user_id: partnerId,
        },
        data: { ...updatedAccountDetails },
      });

      return {
        message: 'Data Saved Successfully!',
        status: HttpStatus.CREATED,
      };
    } catch (err) {
      console.log(err);

      throw new HttpException(
        'Error while Database Operation',
        HttpStatus.FORBIDDEN,
      );
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
}
