import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { PartnerPaymentDetailsDto } from 'src/common/dto/partner-payment-details.dto';
import { successResponse } from 'src/common/models/res.success';

@Injectable()
export class PaymentDetailsService {
  private readonly prisma = new PrismaClient();

  async getAllPaymentDetails(
    partnerId: string,
  ): Promise<PartnerPaymentDetailsDto[]> {
    try {
      return await this.prisma.partner_payment_details.findMany({
        where: {
          user_id: partnerId,
        },
        select: {
          id: true,
          account_type: true,
          mfs_number: true,
          bank_name: true,
        },
      });
    } catch {
      throw new HttpException(
        'Error while Database Operation',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async upsertPaymentDetails(
    partnerId: string,
    paymentDetails: PartnerPaymentDetailsDto,
  ): Promise<successResponse> {
    const newPaymentDetails = plainToClass(
      PartnerPaymentDetailsDto,
      paymentDetails,
    );

    try {
      const upsertPaymentDetails =
        await this.prisma.partner_payment_details.upsert({
          where: {
            id: newPaymentDetails.id,
          },
          update: {
            ...newPaymentDetails,
          },
          create: {
            ...newPaymentDetails,
            user_id: partnerId,
          },
        });
      return {
        message: 'Data Saved Successfully!',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Complete the Form!', HttpStatus.FORBIDDEN);
    }
  }

  async deletePaymentDetails(
    paymentDetailsId: string,
  ): Promise<successResponse> {
    try {
      await this.prisma.partner_payment_details.delete({
        where: {
          id: paymentDetailsId,
        },
      });
      return {
        message: 'Payment Deleted Successfully!',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error in Database Operation!',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async getPaymentDetails(
    paymentDetailsId: string,
  ): Promise<PartnerPaymentDetailsDto> {
    try {
      return await this.prisma.partner_payment_details.findUnique({
        where: {
          id: paymentDetailsId,
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error in Database Operation!',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
