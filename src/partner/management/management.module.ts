import { Module } from '@nestjs/common';

import { DriverController } from './drivers/driver.controller';
import { DriverService } from './drivers/driver.service';
import { VehiclesController } from './vehicles/vehicles.controller';
import { VehiclesService } from './vehicles/vehicles.service';
import { DocumentsController } from './documents/documents.controller';
import { DocumentsService } from './documents/documents.service';

@Module({
  imports: [],
  controllers: [DriverController, VehiclesController, DocumentsController],
  providers: [DriverService, VehiclesService, DocumentsService],
})
export class ManagementModule {}
