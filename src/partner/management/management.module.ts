import { Module } from '@nestjs/common';

import { DriverController } from './drivers/driver.controller';
import { DriverService } from './drivers/driver.service';
import { VehiclesController } from './vehicles/vehicles.controller';
import { VehiclesService } from './vehicles/vehicles.service';
import { PaymentDetailsController } from './payment-details/payment-details.controller';
import { PaymentDetailsService } from './payment-details/payment-details.service';
import { InitController } from './init/init.controller';
import { InitService } from './init/init.service';

@Module({
  imports: [],
  controllers: [DriverController, VehiclesController, PaymentDetailsController, InitController],
  providers: [DriverService, VehiclesService, PaymentDetailsService, InitService],
})
export class ManagementModule {}
