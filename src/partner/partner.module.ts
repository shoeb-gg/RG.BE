import { Module } from '@nestjs/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { SettingsModule } from './settings/settings.module';
import { FormsModule } from './forms/forms.module';

@Module({
  imports: [DashboardModule, SettingsModule, FormsModule],
})
export class PartnerModule {}
