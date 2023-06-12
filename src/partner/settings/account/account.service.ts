import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { PrismaClient } from '@prisma/client';

import { successResponse } from 'src/common/models/res.success';
import { AccountDetailsDto } from 'src/common/dto/account-details.dto';

@Injectable()
export class AccountService {
  private readonly prisma = new PrismaClient();

  async getAccountDetails(partnerId: string): Promise<AccountDetailsDto> {
    try {
      const accInfo: AccountDetailsDto =
        await this.prisma.account_details.findUnique({
          where: {
            user_id: partnerId,
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

      const accDetails: AccountDetailsDto = { ...name, ...accInfo };

      return accDetails;
    } catch {
      throw new HttpException(
        'Error while Database Operation',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async updateAccountDetails(
    partnerId: string,
    partnerAccountInfo: AccountDetailsDto,
  ): Promise<successResponse> {
    const newPartnerAccount = plainToClass(
      AccountDetailsDto,
      partnerAccountInfo,
    );

    const accountDetails = {
      ...newPartnerAccount,
    };

    try {
      await this.prisma.account_details.update({
        where: {
          user_id: partnerId,
        },
        data: { ...accountDetails },
      });

      if (partnerAccountInfo.full_name) {
        const name: string = partnerAccountInfo.full_name;
        await this.prisma.users.update({
          where: {
            id: partnerId,
          },
          data: { full_name: name },
        });
      }

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
