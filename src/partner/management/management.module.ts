import { Module } from '@nestjs/common';

import { DriverController } from './drivers/driver.controller';
import { DriverService } from './drivers/driver.service';
import { VehiclesController } from './vehicles/vehicles.controller';
import { VehiclesService } from './vehicles/vehicles.service';

@Module({
  imports: [],
  controllers: [DriverController, VehiclesController],
  providers: [DriverService, VehiclesService],
})
export class ManagementModule {}
