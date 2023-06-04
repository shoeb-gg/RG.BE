import { Module } from '@nestjs/common';
import { DriverController } from './driver/driver.controller';
import { DriverService } from './driver/driver.service';
import { PartnerController } from './partner/partner.controller';
import { PartnerService } from './partner/partner.service';

@Module({
  imports: [],
  controllers: [DriverController, PartnerController],
  providers: [DriverService, PartnerService],
})
export class FormsModule {}
