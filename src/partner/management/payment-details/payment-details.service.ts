import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { PartnerPaymentDetailsDto } from 'src/common/dto/partner-payment-details.dto';
import { successResponse } from 'src/common/models/res.success';

@Injectable()
export class PaymentDetailsService {
  private readonly prisma = new PrismaClient();

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
            id: partnerId,
          },
          update: {
            ...newPaymentDetails,
          },
          create: {
            ...newPaymentDetails,
            user_id: partnerId,
          },
        });
      console.log(upsertPaymentDetails);
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

  async getPaymentDetails(paymentDetailsId: string): Promise<successResponse> {
    try {
      const paymentDetails =
        await this.prisma.partner_payment_details.findFirstOrThrow({
          where: {
            id: paymentDetailsId,
          },
        });
      console.log(paymentDetails);
      return {
        message: 'Payment Found!',
        status: HttpStatus.OK,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error in Database Operation!',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
