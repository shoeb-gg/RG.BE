import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { PrismaClient } from '@prisma/client';

import { PartnerRegistrationDetailsDto } from 'src/common/dto/partner-reg-details.dto';
import { PartnerBusinessDetailsDto } from 'src/common/dto/partner-business-details.dto';
import { successResponse } from 'src/common/models/res.success';
import { AccountDetailsDto } from 'src/common/dto/account-details.dto';

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
        select: {
          mobile: true,
          email: true,
        },
      });

      const name = await this.prisma.users.findUnique({
        where: {
          id: partnerId,
        },
        select: {
          full_name: true,
        },
      });

      const regData: PartnerRegistrationDetailsDto = {
        ...regInfo,
        ...accountInfo,
        ...name,
      };

      return regData;
    } catch {
      throw new HttpException(
        'Error while Database Operation',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async upsertRegDetails(
    partnerId: string,
    partnerRegInfo: PartnerRegistrationDetailsDto,
  ): Promise<successResponse> {
    const newPartnerReg = plainToClass(
      PartnerRegistrationDetailsDto,
      partnerRegInfo,
    );

    const updatedAccountDetails = {
      dob: partnerRegInfo.dob,
      mobile: partnerRegInfo.mobile ? partnerRegInfo.mobile : null,
      email: partnerRegInfo.email ? partnerRegInfo.email : null,
      form_completed: true,
    };

    const updateAccountForm = plainToClass(
      AccountDetailsDto,
      updatedAccountDetails,
    );

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
        data: { ...updateAccountForm },
      });
      await this.prisma.users.update({
        where: {
          id: partnerId,
        },
        data: { full_name: partnerRegInfo.full_name },
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

  async getBusinessDetails(
    partnerId: string,
  ): Promise<PartnerBusinessDetailsDto> {
    try {
      const businessInfo =
        await this.prisma.partner_business_details.findUnique({
          where: {
            user_id: partnerId,
          },
        });

      return businessInfo;
    } catch {
      throw new HttpException(
        'Error while Database Operation',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async upsertBusinessDetails(
    partnerId: string,
    partnerBusinessInfo: PartnerBusinessDetailsDto,
  ): Promise<successResponse> {
    const newPartnerbusiness = plainToClass(
      PartnerBusinessDetailsDto,
      partnerBusinessInfo,
    );

    console.log(newPartnerbusiness);

    try {
      await this.prisma.partner_business_details.upsert({
        where: {
          user_id: partnerId,
        },
        update: {
          ...newPartnerbusiness,
        },
        create: {
          Users: {
            connect: { id: partnerId },
          },
          ...newPartnerbusiness,
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
}
