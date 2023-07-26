import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PaymentDetailsService } from './payment-details.service';
import { PartnerPaymentDetailsDto } from 'src/common/dto/partner-payment-details.dto';
import { successResponse } from 'src/common/models/res.success';
import { Roles } from 'src/core/jwt-roles/roles.decorator';
import { JwtAuthGuard } from 'src/core/jwt-roles/jwt-auth.guard';
import { RoleGuard } from 'src/core/jwt-roles/roles.guard';
import { User } from 'src/common/decorators/user.decorator';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';

@Controller('payment-details')
@ApiTags('Payments')
export class PaymentDetailsController {
  constructor(private readonly paymentService: PaymentDetailsService) {}

  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('all')
  async getAllPaymentDetails(
    @User() user,
  ): Promise<PartnerPaymentDetailsDto[]> {
    return await this.paymentService.getAllPaymentDetails(user.userId);
  }

  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  async upsertPaymentDetails(
    @User() user,
    @Body() paymentDetails: PartnerPaymentDetailsDto,
  ): Promise<successResponse> {
    return await this.paymentService.upsertPaymentDetails(
      user.userId,
      paymentDetails,
    );
  }

  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':paymentDetailsId')
  async deletePaymentDetails(
    @Param('paymentDetailsId') paymentDetailsId: string,
  ): Promise<successResponse> {
    return this.paymentService.deletePaymentDetails(paymentDetailsId);
  }

  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':paymentDetailsId')
  async getPaymentDetails(
    @Param('paymentDetailsId') paymentDetailsId: string,
  ): Promise<PartnerPaymentDetailsDto> {
    return this.paymentService.getPaymentDetails(paymentDetailsId);
  }
}
