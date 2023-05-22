import { Module } from '@nestjs/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [DashboardModule, SettingsModule]
})
export class PartnerModule {}
