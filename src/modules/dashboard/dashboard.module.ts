import { Module } from '@nestjs/common';

import { CustomerDashboardController } from './customer/customer-dashboard.controller';
import { PartnerDashboardController } from './partner/partner-dashboard.controller';

import { CustomerDashboardService } from './customer/customer-dashboard.service';
import { PartnerDashboardService } from './partner/partner-dashboard.service';

@Module({
  imports: [],
  controllers: [CustomerDashboardController, PartnerDashboardController],
  providers: [CustomerDashboardService, PartnerDashboardService],
})
export class DashboardModule {}
