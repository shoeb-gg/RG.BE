import { Module } from '@nestjs/common';

import { PartnerController } from './partner/partner.controller';
import { PartnerService } from './partner/partner.service';

@Module({
  imports: [],
  controllers: [PartnerController],
  providers: [PartnerService],
})
export class FormsModule {}
