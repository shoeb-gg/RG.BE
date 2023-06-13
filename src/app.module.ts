import { Module } from '@nestjs/common';
import { join } from 'path';

import { CoreModule } from './core/core.module';
import { PartnerModule } from './partner/partner.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [CoreModule, PartnerModule, CustomerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
