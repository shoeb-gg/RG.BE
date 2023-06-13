import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { CoreModule } from './core/core.module';
import { PartnerModule } from './partner/partner.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    CoreModule,
    PartnerModule,
    CustomerModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
